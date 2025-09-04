"use client"

import React from "react"

interface LoadingOverlayProps {
  isAnalyzing: boolean
}

export default function LoadingOverlay({ isAnalyzing }: LoadingOverlayProps) {
  if (!isAnalyzing) return null

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 p-8 rounded-xl border border-slate-600 text-center max-w-sm mx-4">
        <div className="w-12 h-12 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <span className="text-white text-lg font-medium">Analyzing conversations...</span>
        <p className="text-slate-400 text-sm mt-2">This may take a few moments</p>
      </div>
    </div>
  )
}
