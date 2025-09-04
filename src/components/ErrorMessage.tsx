"use client"

import React from "react"

interface ErrorMessageProps {
  error: string | null
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-900/95 to-red-800/95 backdrop-blur-md px-6 py-3 rounded-lg z-50 border border-red-700 max-w-[calc(100vw-2rem)] text-center">
      <p className="text-white font-medium">{error}</p>
    </div>
  )
}
