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
      className={`fixed top-0 w-full bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-md border-b border-slate-700/50 z-10 p-4 ${isFullscreen ? "hidden" : ""}`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">3D</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hidden sm:block">
              ChatGPT Visualizer
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <label className="relative cursor-pointer">
              <input
                type="file"
                accept=".json"
                onChange={onFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="px-4 py-2 bg-slate-700/80 hover:bg-slate-600/80 border border-slate-600 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="hidden sm:inline">
                  {selectedFile ? selectedFile.name.slice(0, 20) + "..." : "Choose JSON File"}
                </span>
                <span className="sm:hidden">
                  {selectedFile ? "File Selected" : "Upload"}
                </span>
              </div>
            </label>

            <button
              onClick={onAnalyze}
              disabled={!selectedFile || isAnalyzing}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 shadow-lg"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="hidden sm:inline">Analyzing...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span className="hidden sm:inline">Generate 3D Web</span>
                  <span className="sm:hidden">Generate</span>
                </>
              )}
            </button>

            <button
              onClick={onShowHowTo}
              className="px-4 py-2 bg-slate-700/80 hover:bg-slate-600/80 border border-slate-600 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="hidden lg:inline">How to Export</span>
              <span className="lg:hidden">Help</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Social Links - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="https://github.com/sanjulaonline/3D-Conversation-Visualizer"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-700/80 hover:bg-slate-600/80 border border-slate-600 rounded-lg transition-all duration-200 group"
              title="GitHub Repository"
            >
              <svg
                className="w-4 h-4 group-hover:text-purple-400 transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>

          {sceneInitialized && (
            <div className="flex items-center gap-2 lg:gap-4 text-sm border-l border-slate-600 pl-2 lg:pl-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRotation}
                  onChange={(e) => onAutoRotationChange(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="font-medium hidden lg:inline">Auto Rotate</span>
                <span className="font-medium lg:hidden">Auto</span>
              </label>

              <button
                onClick={onToggleFullscreen}
                className="px-2 lg:px-3 py-2 bg-slate-700/80 hover:bg-slate-600/80 border border-slate-600 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isFullscreen
                        ? "M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5M15 15h4.5M15 15v4.5m0-4.5l5.5 5.5"
                        : "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    }
                  />
                </svg>
                <span className="hidden lg:inline">
                  {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                </span>
              </button>

              <div className="hidden xl:flex items-center gap-3 bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-600">
                <span className="text-blue-400 font-medium">Words:</span>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="50"
                  value={wordCount}
                  onChange={(e) => onWordCountChange(Number.parseInt(e.target.value))}
                  className="w-24 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="font-mono text-sm min-w-[3rem] text-center">{wordCount}</span>
                <span className={`text-xs font-medium ${wordCountWarning.color} max-w-[120px] truncate`}>
                  {wordCountWarning.text.split(".")[0]}
                </span>
              </div>

              {/* Mobile word count controls */}
              <div className="xl:hidden flex items-center gap-2 bg-slate-800/50 px-2 py-1 rounded-lg border border-slate-600">
                <span className="text-blue-400 font-medium text-xs">Words:</span>
                <span className="font-mono text-xs min-w-[2rem] text-center">{wordCount}</span>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="50"
                  value={wordCount}
                  onChange={(e) => onWordCountChange(Number.parseInt(e.target.value))}
                  className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
