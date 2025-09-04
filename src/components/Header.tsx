import type React from "react"
import FileUpload from "./FileUpload"
import Controls from "./Controls"
import { WordCountWarning } from "@/types"

interface HeaderProps {
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
}

const Header: React.FC<HeaderProps> = ({
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
}) => {
  if (isFullscreen) return null

  return (
    <div className="fixed top-0 w-full bg-black/60 z-10 p-2 flex items-center justify-between">
      <FileUpload
        selectedFile={selectedFile}
        onFileSelect={onFileSelect}
        onAnalyze={onAnalyze}
        isAnalyzing={isAnalyzing}
        onShowHowTo={onShowHowTo}
      />

      {sceneInitialized && (
        <Controls
          autoRotation={autoRotation}
          onAutoRotationChange={onAutoRotationChange}
          onToggleFullscreen={onToggleFullscreen}
          isFullscreen={isFullscreen}
          wordCount={wordCount}
          onWordCountChange={onWordCountChange}
          wordCountWarning={wordCountWarning}
        />
      )}
    </div>
  )
}

export default Header
