import type React from "react"

interface FileUploadProps {
  selectedFile: File | null
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void
  onAnalyze: () => void
  isAnalyzing: boolean
  onShowHowTo: () => void
}

const FileUpload: React.FC<FileUploadProps> = ({
  selectedFile,
  onFileSelect,
  onAnalyze,
  isAnalyzing,
  onShowHowTo,
}) => {
  return (
    <div className="flex gap-2 items-center">
      <input 
        type="file" 
        accept=".json" 
        onChange={onFileSelect} 
        className="text-sm" 
      />
      <button
        onClick={onAnalyze}
        disabled={!selectedFile || isAnalyzing}
        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded text-sm"
      >
        {isAnalyzing ? "⏳ Analyzing..." : "✨ Generate 3D Web"}
      </button>
      <button
        onClick={onShowHowTo}
        className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-sm"
      >
        ❔ How to get JSON
      </button>
    </div>
  )
}

export default FileUpload
