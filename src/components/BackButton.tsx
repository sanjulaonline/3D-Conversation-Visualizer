"use client"

import React from "react"

interface BackButtonProps {
  onClick: () => void
}

export default function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 left-4 z-50 px-4 py-2 bg-slate-800/90 hover:bg-slate-700/90 backdrop-blur-md border border-slate-600 rounded-lg text-white font-medium transition-all duration-200 flex items-center gap-2"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      <span className="hidden sm:inline">Back to Home</span>
    </button>
  )
}
