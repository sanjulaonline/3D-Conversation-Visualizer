import { Node, Link } from "@/types"

export const generateNodes = (words: [string, number][]): Node[] => {
  const nodes: Node[] = []
  
  for (let i = 0; i < words.length; i++) {
    const [word, freq] = words[i]
    nodes.push({
      id: i,
      word: word,
      frequency: freq,
      size: Math.min(Math.max(freq * 1.5, 8), 25),
      group: i % 12,
    })
  }
  
  return nodes
}

export const generateLinks = (nodes: Node[]): Link[] => {
  const links: Link[] = []
  
  // Create links with seeded randomness
  const seedRandom = (seed: number) => {
    let x = Math.sin(seed) * 10000
    return () => {
      x = ((x + 0.5) * 17) % 1
      return x
    }
  }

  const rand = seedRandom(42)
  
  for (let i = 0; i < nodes.length; i++) {
    const currentFreq = nodes[i].frequency
    const numConnections = Math.min(Math.max(Math.floor(currentFreq / 5), 3), 15)
    let targets: number[] = []

    // Add nearby connections
    for (let j = Math.max(0, i - 5); j < Math.min(nodes.length, i + 6); j++) {
      if (j !== i) {
        targets.push(j)
      }
    }

    // Add random connections
    const availableTargets = nodes.map((_, idx) => idx).filter((idx) => idx !== i && !targets.includes(idx))
    for (let k = availableTargets.length - 1; k > 0; k--) {
      const j = Math.floor(rand() * (k + 1))
      ;[availableTargets[k], availableTargets[j]] = [availableTargets[j], availableTargets[k]]
    }

    const randomTargets = availableTargets.slice(
      0,
      Math.min(numConnections - targets.length, availableTargets.length),
    )
    targets.push(...randomTargets)
    targets = Array.from(new Set(targets)).slice(0, numConnections)

    for (const target of targets) {
      const freqDiff = Math.abs(nodes[i].frequency - nodes[target].frequency)
      const maxFreq = Math.max(nodes[i].frequency, nodes[target].frequency)
      const strength = maxFreq > 0 ? Math.max(0.2, 1.0 - freqDiff / maxFreq) : 0.5
      links.push({
        source: i,
        target: target,
        strength: strength,
      })
    }
  }
  
  return links
}
