"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Node, Link } from "@/types"
import { extractWordsFromConversations, getWordCountWarning } from "@/utils/textAnalysis"
import { generateNodes, generateLinks } from "@/utils/graphGeneration"
import LandingHero from "@/components/LandingHero"
import FileUploadScreen from "@/components/FileUploadScreen"
import VisualizerScreen from "@/components/VisualizerScreen"

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

  const handleFileUpload = useCallback((file: File) => {
    setSelectedFile(file)
    setShowFileUpload(false)
    // Automatically start analysis
    if (file && file.name.endsWith(".json")) {
      setIsAnalyzing(true)
      setTimeout(() => {
        // Trigger file processing
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
          } catch (error) {
            const err = error as Error
            showError("Error processing file: " + err.message)
          } finally {
            setIsAnalyzing(false)
          }
        }
        reader.readAsText(file)
      }, 100)
    }
  }, [wordCount, showError])

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }, [handleFileUpload])

  const handleFileDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    
    const file = event.dataTransfer.files?.[0]
    if (file) {
      if (file.name.endsWith('.json')) {
        handleFileUpload(file)
      } else {
        showError("Please upload a JSON file.")
      }
    }
  }, [handleFileUpload, showError])

  const wordCountWarning = getWordCountWarning(wordCount)

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (err: unknown) {
      const error = err as Error
      setCustomMessage(
        `Error attempting to enable full-screen mode: ${error.message} (${error.name}). Please try again or check browser settings.`,
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
        } catch (parseError: unknown) {
          const error = parseError as Error
          console.error("Error parsing JSON or analyzing data:", parseError)
          showError(
            "Error processing JSON file. Please ensure it's a valid `conversations.json` from ChatGPT. Details: " +
              error.message,
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
    } catch (error: unknown) {
      const err = error as Error
      console.error("Overall analysis error:", error)
      showError("An unexpected error occurred during analysis: " + err.message)
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
      <FileUploadScreen
        onFileSelect={handleFileSelect}
        onFileDrop={handleFileDrop}
        onBackToLanding={handleBackToLanding}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
      />
    )
  }

  // Show visualizer
  return (
    <VisualizerScreen
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
      onBackToLanding={handleBackToLanding}
      showInstructions={showInstructions}
      nodes={nodes}
      links={links}
      onNodeClick={handleNodeClick}
      onSceneInitialized={onSceneInitialized}
      error={error}
      showHowTo={showHowTo}
      onCloseHowTo={() => setShowHowTo(false)}
      customMessage={customMessage}
      onCloseCustomMessage={() => setCustomMessage(null)}
    />
  )
}
