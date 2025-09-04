import type React from "react"
import { useState, useEffect } from "react"
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
  // wordCountWarning, // TODO: Use this for validation display
}) => {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: isMobile ? "auto" : "80px",
        padding: isMobile ? "12px 16px" : "20px 40px",
        display: isFullscreen ? "none" : "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "stretch" : "center",
        justifyContent: "space-between",
        backgroundColor: "rgba(0,0,0,0.1)",
        backdropFilter: "blur(10px)",
        color: "white",
        zIndex: 50,
        pointerEvents: "none",
        gap: isMobile ? "12px" : "0"
      }}
    >
      {/* Left Section */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: isMobile ? "12px" : isTablet ? "24px" : "40px", 
        pointerEvents: "all",
        flexWrap: isMobile ? "wrap" : "nowrap",
        width: isMobile ? "100%" : "auto"
      }}>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: isMobile ? 16 : 20,
            fontWeight: "700",
            alignItems: "center",
            letterSpacing: -1,
            margin: 0,
            color: "white",
            minWidth: "fit-content"
          }}
        >
          VISUALIZER
        </p>

        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: isMobile ? "8px" : "16px",
          flexWrap: isMobile ? "wrap" : "nowrap",
          flex: isMobile ? "1" : "none"
        }}>
          <label
            style={{
              position: "relative",
              cursor: "pointer",
              fontSize: isMobile ? 10 : 12,
              fontWeight: "500",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              padding: isMobile ? "6px 12px" : "8px 16px",
              border: "1px solid white",
              backgroundColor: "transparent",
              color: "white",
              transition: "all 0.3s ease",
              minWidth: "fit-content"
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
            {selectedFile ? (
              isMobile ? "FILE" : selectedFile.name.slice(0, 12) + "..."
            ) : (
              isMobile ? "SELECT" : "SELECT FILE"
            )}
          </label>

          <button
            onClick={onAnalyze}
            disabled={!selectedFile || isAnalyzing}
            style={{
              fontSize: isMobile ? 10 : 12,
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              padding: isMobile ? "6px 12px" : "8px 16px",
              border: "2px solid white",
              backgroundColor: !selectedFile || isAnalyzing ? "rgba(255,255,255,0.3)" : "white",
              color: !selectedFile || isAnalyzing ? "rgba(255,255,255,0.5)" : "black",
              cursor: !selectedFile || isAnalyzing ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              minWidth: "fit-content"
            }}
          >
            {isAnalyzing ? (isMobile ? "..." : "ANALYZING...") : (isMobile ? "GO" : "GENERATE")}
          </button>

          {!isMobile && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: isTablet ? "8px" : "12px",
                padding: isTablet ? "6px 12px" : "8px 16px",
                border: "1px solid rgba(255,255,255,0.3)",
                backgroundColor: "rgba(0,0,0,0.2)",
                minWidth: "fit-content"
              }}
            >
              <span
                style={{
                  fontSize: isTablet ? 10 : 12,
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
                  width: isTablet ? 60 : 80,
                  height: 4,
                  backgroundColor: "rgba(255,255,255,0.3)",
                  borderRadius: 2,
                  outline: "none",
                  cursor: "pointer"
                }}
              />
              <span
                style={{
                  fontSize: isTablet ? 10 : 12,
                  fontWeight: "700",
                  fontFamily: "monospace",
                  minWidth: isTablet ? 30 : 40,
                  textAlign: "center",
                  color: "white"
                }}
              >
                {wordCount}
              </span>
            </div>
          )}

          {/* Mobile Word Count - Simplified */}
          {isMobile && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: 10,
              color: "white"
            }}>
              <span>W:</span>
              <span style={{ fontFamily: "monospace", fontWeight: "700" }}>{wordCount}</span>
            </div>
          )}

        </div>
      </div>

      {/* Right Section */}
      {sceneInitialized && (
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: isMobile ? "8px" : isTablet ? "16px" : "24px", 
          pointerEvents: "all",
          flexWrap: isMobile ? "wrap" : "nowrap",
          width: isMobile ? "100%" : "auto",
          justifyContent: isMobile ? "space-between" : "flex-end"
        }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
              fontSize: isMobile ? 10 : 12,
              fontWeight: "500",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              color: "white",
              minWidth: "fit-content"
            }}
          >
            <input
              type="checkbox"
              checked={autoRotation}
              onChange={(e) => onAutoRotationChange(e.target.checked)}
              style={{
                width: isMobile ? 12 : 16,
                height: isMobile ? 12 : 16,
                accentColor: "white"
              }}
            />
            {isMobile ? "AUTO" : "AUTO ROTATE"}
          </label>

          <button
            onClick={onToggleFullscreen}
            style={{
              fontSize: isMobile ? 10 : 12,
              fontWeight: "500",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              padding: isMobile ? "6px 8px" : "8px 16px",
              border: "1px solid rgba(255,255,255,0.5)",
              backgroundColor: "transparent",
              color: "rgba(255,255,255,0.7)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              minWidth: "fit-content"
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
            {isFullscreen ? (isMobile ? "EXIT" : "EXIT FULL") : (isMobile ? "FULL" : "FULLSCREEN")}
          </button>

          <button
            onClick={onShowHowTo}
            style={{
              fontSize: isMobile ? 10 : 12,
              fontWeight: "500",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              padding: isMobile ? "6px 12px" : "8px 16px",
              border: "1px solid rgba(255,255,255,0.5)",
              backgroundColor: "transparent",
              color: "rgba(255,255,255,0.7)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              minWidth: "fit-content"
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
            {isMobile ? "?" : "HELP"}
          </button>
        </div>
      )}
    </div>
  )
}

export default Header
