export interface Node {
  id: number
  word: string
  frequency: number
  size: number
  group: number
}

export interface Link {
  source: number
  target: number
  strength: number
}

export interface Analysis {
  total_conversations: number
  total_messages: number
  total_words: number
  unique_words: number
  words: [string, number][]
}

export interface WordCountWarning {
  text: string
  color: string
}

export interface MouseState {
  isDown: boolean
  x: number
  y: number
}

export interface AnimationParams {
  rotationSpeed: number
  nodeSizeFactor: number
  connectionOpacity: number
  dotOpacity: number
}
