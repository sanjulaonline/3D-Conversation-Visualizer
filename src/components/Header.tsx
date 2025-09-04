import type React from "react"
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
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "80px",
        padding: "20px 40px",
        display: isFullscreen ? "none" : "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "transparent",
        color: "white",
        zIndex: 50,
        pointerEvents: "none"
      }}
    >
      {/* Left Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "40px", pointerEvents: "all" }}>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 20,
            fontWeight: "700",
            letterSpacing: -1,
            margin: 0,
            color: "white"
          }}
        >
          VISUALIZER
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <label
            style={{
              position: "relative",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: "500",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              padding: "8px 16px",
              border: "1px solid white",
              backgroundColor: "transparent",
              color: "white",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "white"
              e.currentTarget.style.color = "black"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
              e.currentTarget.style.color = "white"
            }}
          >
            <input
              type="file"
              accept=".json"
              onChange={onFileSelect}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                cursor: "pointer"
              }}
            />
            {selectedFile ? selectedFile.name.slice(0, 15) + "..." : "SELECT FILE"}
          </label>

          <button
            onClick={onAnalyze}
            disabled={!selectedFile || isAnalyzing}
            style={{
              fontSize: 12,
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              padding: "8px 16px",
              border: "2px solid white",
              backgroundColor: !selectedFile || isAnalyzing ? "rgba(255,255,255,0.3)" : "white",
              color: !selectedFile || isAnalyzing ? "rgba(255,255,255,0.5)" : "black",
              cursor: !selectedFile || isAnalyzing ? "not-allowed" : "pointer",
              transition: "all 0.3s ease"
            }}
          >
            {isAnalyzing ? "ANALYZING..." : "GENERATE"}
          </button>

          <button
            onClick={onShowHowTo}
            style={{
              fontSize: 12,
              fontWeight: "500",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              padding: "8px 16px",
              border: "1px solid rgba(255,255,255,0.5)",
              backgroundColor: "transparent",
              color: "rgba(255,255,255,0.7)",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "white"
              e.currentTarget.style.color = "white"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"
              e.currentTarget.style.color = "rgba(255,255,255,0.7)"
            }}
          >
            HELP
          </button>
        </div>
      </div>

      {/* Right Section */}
      {sceneInitialized && (
        <div style={{ display: "flex", alignItems: "center", gap: "24px", pointerEvents: "all" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: "500",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              color: "white"
            }}
          >
            <input
              type="checkbox"
              checked={autoRotation}
              onChange={(e) => onAutoRotationChange(e.target.checked)}
              style={{
                width: 16,
                height: 16,
                accentColor: "white"
              }}
            />
            AUTO ROTATE
          </label>

          <button
            onClick={onToggleFullscreen}
            style={{
              fontSize: 12,
              fontWeight: "500",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              padding: "8px 16px",
              border: "1px solid rgba(255,255,255,0.5)",
              backgroundColor: "transparent",
              color: "rgba(255,255,255,0.7)",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "white"
              e.currentTarget.style.color = "white"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"
              e.currentTarget.style.color = "rgba(255,255,255,0.7)"
            }}
          >
            {isFullscreen ? "EXIT FULL" : "FULLSCREEN"}
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "8px 16px",
              border: "1px solid rgba(255,255,255,0.3)",
              backgroundColor: "rgba(0,0,0,0.2)"
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: "500",
                textTransform: "uppercase",
                letterSpacing: 0.5,
                color: "white"
              }}
            >
              WORDS:
            </span>
            <input
              type="range"
              min="50"
              max="2000"
              step="50"
              value={wordCount}
              onChange={(e) => onWordCountChange(Number.parseInt(e.target.value))}
              style={{
                width: 80,
                height: 4,
                backgroundColor: "rgba(255,255,255,0.3)",
                borderRadius: 2,
                outline: "none",
                cursor: "pointer"
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontWeight: "700",
                fontFamily: "monospace",
                minWidth: 40,
                textAlign: "center",
                color: "white"
              }}
            >
              {wordCount}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
