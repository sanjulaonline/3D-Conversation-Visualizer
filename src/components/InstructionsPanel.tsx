"use client"

import React from "react"

interface InstructionsPanelProps {
  showInstructions: boolean
  isFullscreen: boolean
}

export default function InstructionsPanel({ 
  showInstructions, 
  isFullscreen 
}: InstructionsPanelProps) {
  if (!showInstructions || isFullscreen) return null

  return (
    <div className="fixed top-36 sm:top-40 left-4 text-xs sm:text-sm bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-md p-3 rounded-lg border border-slate-600 max-w-[calc(100vw-2rem)] sm:max-w-none">
      <strong className="text-blue-400">Interact:</strong> 
      <span className="block sm:inline"> Drag to rotate • Scroll to zoom • Click words for stats</span>
    </div>
  )
}
