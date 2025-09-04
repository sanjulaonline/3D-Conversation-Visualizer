"use client"

import React, { useState } from 'react'
import LandingHero from '@/components/LandingHero'
import ChatGPTVisualizerPage from './page'

const LandingPage: React.FC = () => {
  const [showVisualizer, setShowVisualizer] = useState(false)

  const handleGetStarted = () => {
    setShowVisualizer(true)
  }

  const handleBackToLanding = () => {
    setShowVisualizer(false)
  }

  if (showVisualizer) {
    return (
      <div className="relative">
        {/* Back button */}
        <button
          onClick={handleBackToLanding}
          className="fixed top-4 left-4 z-50 px-4 py-2 bg-slate-800/90 hover:bg-slate-700/90 backdrop-blur-md border border-slate-600 rounded-lg text-white font-medium transition-all duration-200 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>
        <ChatGPTVisualizerPage />
      </div>
    )
  }

  return <LandingHero onGetStarted={handleGetStarted} />
}

export default LandingPage
