"use client"

import React from "react"
import { Node, Link, WordCountWarning } from "@/types"
import Header from "./Header"
import ThreeVisualization from "./ThreeVisualization"
import BackButton from "./BackButton"
import InstructionsPanel from "./InstructionsPanel"
import LoadingOverlay from "./LoadingOverlay"
import ErrorMessage from "./ErrorMessage"
import HowToModal from "./HowToModal"
import MessageModal from "./MessageModal"

interface VisualizerScreenProps {
  selectedFile: File | null
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void
  onAnalyze: () => void
  isAnalyzing: boolean
  onShowHowTo: () => void
  sceneInitialized: boolean
  autoRotation: boolean
  onAutoRotationChange: (checked: boolean) => void
  onToggleFullscreen: () => void
  isFullscreen: boolean
  wordCount: number
  onWordCountChange: (count: number) => void
  wordCountWarning: WordCountWarning
  showInstructions: boolean
  nodes: Node[]
  links: Link[]
  onNodeClick: (node: Node) => void
  onSceneInitialized: () => void
  error: string | null
  showHowTo: boolean
  onCloseHowTo: () => void
  customMessage: string | null
  onCloseCustomMessage: () => void
  onBackToLanding: () => void
}

export default function VisualizerScreen({
  selectedFile,
  onFileSelect,
  onAnalyze,
  isAnalyzing,
  onShowHowTo,
  sceneInitialized,
  autoRotation,
  onAutoRotationChange,
  onToggleFullscreen,
  isFullscreen,
  wordCount,
  onWordCountChange,
  wordCountWarning,
  showInstructions,
  nodes,
  links,
  onNodeClick,
  onSceneInitialized,
  error,
  showHowTo,
  onCloseHowTo,
  customMessage,
  onCloseCustomMessage,
  onBackToLanding
}: VisualizerScreenProps) {
  return (
    <div className="relative w-screen h-screen bg-black text-white font-sans overflow-hidden">
      {/* Header */}
      <div className="pt-16">
        <Header
          selectedFile={selectedFile}
          onFileSelect={onFileSelect}
          onAnalyze={onAnalyze}
          isAnalyzing={isAnalyzing}
          onShowHowTo={onShowHowTo}
          sceneInitialized={sceneInitialized}
          autoRotation={autoRotation}
          onAutoRotationChange={onAutoRotationChange}
          onToggleFullscreen={onToggleFullscreen}
          isFullscreen={isFullscreen}
          wordCount={wordCount}
          onWordCountChange={onWordCountChange}
          wordCountWarning={wordCountWarning}
        />
      </div>

      {/* Back to Landing Button */}
      <BackButton onClick={onBackToLanding} />

      {/* Instructions */}
      <InstructionsPanel 
        showInstructions={showInstructions} 
        isFullscreen={isFullscreen} 
      />

      {/* Three.js Visualization */}
      <ThreeVisualization
        nodes={nodes}
        links={links}
        autoRotation={autoRotation}
        onNodeClick={onNodeClick}
        onSceneInitialized={onSceneInitialized}
      />

      {/* Loading Overlay */}
      <LoadingOverlay isAnalyzing={isAnalyzing} />

      {/* Error Message */}
      <ErrorMessage error={error} />

      {/* How to Get JSON Modal */}
      <HowToModal isOpen={showHowTo} onClose={onCloseHowTo} />

      {/* Custom Message Modal */}
      <MessageModal message={customMessage} onClose={onCloseCustomMessage} />
    </div>
  )
}
