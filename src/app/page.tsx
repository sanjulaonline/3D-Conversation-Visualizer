"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Node, Link, Analysis } from "@/types"
import { extractWordsFromConversations, getWordCountWarning } from "@/utils/textAnalysis"
import { generateNodes, generateLinks } from "@/utils/graphGeneration"
import Header from "@/components/Header"
import ThreeVisualization from "@/components/ThreeVisualization"
import HowToModal from "@/components/HowToModal"
import MessageModal from "@/components/MessageModal"
import LandingHero from "@/components/LandingHero"

export default function ChatGPTVisualizerApp() {
  // Landing page state
  const [showLanding, setShowLanding] = useState(true)
  const [showFileUpload, setShowFileUpload] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  
  // Existing state management
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [wordCount, setWordCount] = useState(100)
  const [autoRotation, setAutoRotation] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [showHowTo, setShowHowTo] = useState(false)
  const [customMessage, setCustomMessage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [sceneInitialized, setSceneInitialized] = useState(false)
  const [nodes, setNodes] = useState<Node[]>([])
  const [links, setLinks] = useState<Link[]>([])

  const handleGetStarted = () => {
    setShowLanding(false)
    setShowFileUpload(true)
  }

  const handleBackToLanding = () => {
    setShowLanding(true)
    setShowFileUpload(true)
    // Reset visualizer state
    setNodes([])
    setLinks([])
    setSceneInitialized(false)
    setSelectedFile(null)
    setShowInstructions(false)
  }

  // Existing functions
  const showError = useCallback((message: string) => {
    setError(message)
    setTimeout(() => setError(null), 5000)
  }, [])

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setShowFileUpload(false)
    }
  }, [])

  const handleFileDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    
    const file = event.dataTransfer.files?.[0]
    if (file) {
      if (file.name.endsWith('.json')) {
        setSelectedFile(file)
        setShowFileUpload(false)
      } else {
        showError("Please upload a JSON file.")
      }
    }
  }, [])

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
  }, [])

  const wordCountWarning = getWordCountWarning(wordCount)

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (err: any) {
      setCustomMessage(
        `Error attempting to enable full-screen mode: ${err.message} (${err.name}). Please try again or check browser settings.`,
      )
    }
  }, [])

  const handleNodeClick = useCallback((node: Node) => {
    const totalFreq = nodes.reduce((sum, n) => sum + n.frequency, 0)
    const percentage = ((node.frequency / totalFreq) * 100).toFixed(2)
    const rank = nodes.findIndex((n) => n.word === node.word) + 1
    setCustomMessage(
      `🔤 Word: "${node.word}"\n📊 Frequency: ${node.frequency} times\n📈 Percentage: ${percentage}% of total words\n🏆 Rank: #${rank}`,
    )
  }, [nodes])

  const onSceneInitialized = useCallback(() => {
    setSceneInitialized(true)
    setShowInstructions(true)
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && document.fullscreenElement) {
        document.exitFullscreen()
      }
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const analyzeFile = useCallback(async () => {
    if (!selectedFile) {
      showError("Please select a file first")
      return
    }
    if (!selectedFile.name.endsWith(".json")) {
      showError("Please upload a JSON file.")
      return
    }

    setIsAnalyzing(true)

    try {
      const reader = new FileReader()
      reader.onload = async (event) => {
        try {
          const conversationsData = JSON.parse(event.target?.result as string)
          const analysis = await extractWordsFromConversations(conversationsData, wordCount)

          const generatedNodes = generateNodes(analysis.words)
          const generatedLinks = generateLinks(generatedNodes)

          setNodes(generatedNodes)
          setLinks(generatedLinks)
          setShowHowTo(false)
        } catch (parseError: any) {
          console.error("Error parsing JSON or analyzing data:", parseError)
          showError(
            "Error processing JSON file. Please ensure it's a valid `conversations.json` from ChatGPT. Details: " +
              parseError.message,
          )
        } finally {
          setIsAnalyzing(false)
        }
      }

      reader.onerror = () => {
        showError("Error reading file. Please try again.")
        setIsAnalyzing(false)
      }

      reader.readAsText(selectedFile)
    } catch (error: any) {
      console.error("Overall analysis error:", error)
      showError("An unexpected error occurred during analysis: " + error.message)
      setIsAnalyzing(false)
    }
  }, [selectedFile, wordCount, showError])

  // Show landing page
  if (showLanding) {
    return <LandingHero onGetStarted={handleGetStarted} />
  }

  // Show file upload screen
  if (showFileUpload) {
    return (
      <div className="relative w-screen h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden">
        {/* Back to Landing Button */}
        <button
          onClick={handleBackToLanding}
          style={{
            position: "fixed",
            top: 20,
            left: 20,
            zIndex: 50,
            padding: "12px 24px",
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "8px",
            color: "white",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: 14
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.2)"
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)"
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          BACK TO HOME
        </button>

        {/* File Upload Area */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "600px",
            textAlign: "center",
            color: "white"
          }}
        >
          {/* Title */}
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 48,
              fontWeight: "700",
              letterSpacing: -2,
              marginBottom: 16,
              color: "white"
            }}
          >
            UPLOAD JSON
          </h1>
          
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.7)",
              marginBottom: 40,
              lineHeight: "1.5em"
            }}
          >
            Upload your ChatGPT conversations.json file to begin visualization
          </p>

          {/* Drag & Drop Area */}
          <div
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            style={{
              position: "relative",
              border: `2px dashed ${isDragging ? "white" : "rgba(255,255,255,0.3)"}`,
              borderRadius: "16px",
              padding: "60px 40px",
              background: isDragging ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              backdropFilter: "blur(10px)"
            }}
          >
            {/* Upload Icon */}
            <div style={{ marginBottom: 24 }}>
              <svg
                width="64"
                height="64"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{
                  margin: "0 auto",
                  color: isDragging ? "white" : "rgba(255,255,255,0.6)",
                  transition: "color 0.3s ease"
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>

            {/* Upload Text */}
            <div style={{ marginBottom: 24 }}>
              <h3
                style={{
                  fontSize: 24,
                  fontWeight: "600",
                  marginBottom: 8,
                  color: isDragging ? "white" : "rgba(255,255,255,0.9)"
                }}
              >
                {isDragging ? "Drop your file here" : "Drag & drop your JSON file"}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: 24
                }}
              >
                or
              </p>
            </div>

            {/* Choose File Button */}
            <label
              style={{
                display: "inline-block",
                padding: "16px 32px",
                background: "white",
                color: "black",
                fontWeight: "600",
                fontSize: 16,
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                textTransform: "uppercase",
                letterSpacing: 0.5
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.9)"
                e.currentTarget.style.transform = "translateY(-2px)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white"
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              <input
                type="file"
                accept=".json"
                onChange={handleFileSelect}
                style={{
                  position: "absolute",
                  left: "-9999px",
                  opacity: 0
                }}
              />
              Choose File
            </label>
          </div>

          {/* Instructions */}
          <div
            style={{
              marginTop: 32,
              padding: "24px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
              textAlign: "left"
            }}
          >
            <h4
              style={{
                fontSize: 16,
                fontWeight: "600",
                marginBottom: 12,
                color: "white"
              }}
            >
              How to get your ChatGPT data:
            </h4>
            <ol
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.7)",
                lineHeight: "1.6em",
                paddingLeft: 20
              }}
            >
              <li>Go to ChatGPT Settings → Data Controls</li>
              <li>Click "Export data"</li>
              <li>Wait for email with download link</li>
              <li>Extract and upload the conversations.json file</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }

  // Show visualizer
  return (
    <div className="relative w-screen h-screen bg-black text-white font-sans overflow-hidden">
      {/* Back to Landing Button */}

      {/* Header */}
      <div className="pt-16">
        <Header
          selectedFile={selectedFile}
          onFileSelect={handleFileSelect}
          onAnalyze={analyzeFile}
          isAnalyzing={isAnalyzing}
          onShowHowTo={() => setShowHowTo(true)}
          sceneInitialized={sceneInitialized}
          autoRotation={autoRotation}
          onAutoRotationChange={setAutoRotation}
          onToggleFullscreen={toggleFullscreen}
          isFullscreen={isFullscreen}
          wordCount={wordCount}
          onWordCountChange={setWordCount}
          wordCountWarning={wordCountWarning}
        />
      </div>
      <button
        onClick={handleBackToLanding}
        className="fixed top-4 left-4 z-50 px-4 py-2 bg-slate-800/90 hover:bg-slate-700/90 backdrop-blur-md border border-slate-600 rounded-lg text-white font-medium transition-all duration-200 flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Back to Home</span>
      </button>

      {/* Instructions */}
      {showInstructions && !isFullscreen && (
        <div className="fixed top-36 sm:top-40 left-4 text-xs sm:text-sm bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-md p-3 rounded-lg border border-slate-600 max-w-[calc(100vw-2rem)] sm:max-w-none">
          <strong className="text-blue-400">Interact:</strong> 
          <span className="block sm:inline"> Drag to rotate • Scroll to zoom • Click words for stats</span>
        </div>
      )}

      {/* Three.js Visualization */}
      <ThreeVisualization
        nodes={nodes}
        links={links}
        autoRotation={autoRotation}
        onNodeClick={handleNodeClick}
        onSceneInitialized={onSceneInitialized}
      />

      {/* Loading Overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 p-8 rounded-xl border border-slate-600 text-center max-w-sm mx-4">
            <div className="w-12 h-12 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <span className="text-white text-lg font-medium">Analyzing conversations...</span>
            <p className="text-slate-400 text-sm mt-2">This may take a few moments</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-900/95 to-red-800/95 backdrop-blur-md px-6 py-3 rounded-lg z-50 border border-red-700 max-w-[calc(100vw-2rem)] text-center">
          <p className="text-white font-medium">{error}</p>
        </div>
      )}

      {/* How to Get JSON Modal */}
      <HowToModal isOpen={showHowTo} onClose={() => setShowHowTo(false)} />

      {/* Custom Message Modal */}
      <MessageModal message={customMessage} onClose={() => setCustomMessage(null)} />
    </div>
  )
}
