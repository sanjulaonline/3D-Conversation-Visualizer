"use client"

import React, { useCallback } from "react"

interface FileUploadScreenProps {
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFileDrop: (event: React.DragEvent<HTMLDivElement>) => void
  onBackToLanding: () => void
  isDragging: boolean
  setIsDragging: (isDragging: boolean) => void
}

export default function FileUploadScreen({ 
  onFileSelect, 
  onFileDrop,
  onBackToLanding, 
  isDragging,
  setIsDragging
}: FileUploadScreenProps) {
  
  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(true)
  }, [setIsDragging])

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
  }, [setIsDragging])

  return (
    <div className="relative w-screen h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden">
      {/* Back to Landing Button */}
      <button
        onClick={onBackToLanding}
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
          onDrop={onFileDrop}
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
              onChange={onFileSelect}
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
            <li>Click &quot;Export data&quot;</li>
            <li>Wait for email with download link</li>
            <li>Extract and upload the conversations.json file</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
