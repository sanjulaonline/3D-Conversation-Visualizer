import { Analysis, WordCountWarning } from "@/types"

// Stop words for text analysis
export const stopWords = new Set([
  "i",
  "me",
  "my",
  "myself",
  "we",
  "our",
  "ours",
  "ourselves",
  "you",
  "you're",
  "you've",
  "you'll",
  "you'd",
  "your",
  "yours",
  "yourself",
  "yourselves",
  "he",
  "him",
  "his",
  "himself",
  "she",
  "she's",
  "her",
  "hers",
  "herself",
  "it",
  "it's",
  "its",
  "itself",
  "they",
  "them",
  "their",
  "theirs",
  "themselves",
  "what",
  "which",
  "who",
  "whom",
  "this",
  "that",
  "that'll",
  "these",
  "those",
  "am",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "having",
  "do",
  "does",
  "did",
  "doing",
  "a",
  "an",
  "the",
  "and",
  "but",
  "if",
  "or",
  "because",
  "as",
  "until",
  "while",
  "of",
  "at",
  "by",
  "for",
  "with",
  "about",
  "against",
  "between",
  "into",
  "through",
  "during",
  "before",
  "after",
  "above",
  "below",
  "to",
  "from",
  "up",
  "down",
  "in",
  "out",
  "on",
  "off",
  "over",
  "under",
  "again",
  "further",
  "then",
  "once",
  "here",
  "there",
  "when",
  "where",
  "why",
  "how",
  "all",
  "any",
  "both",
  "each",
  "few",
  "more",
  "most",
  "other",
  "some",
  "such",
  "no",
  "nor",
  "not",
  "only",
  "own",
  "same",
  "so",
  "than",
  "too",
  "very",
  "s",
  "t",
  "can",
  "will",
  "just",
  "don",
  "don't",
  "should",
  "should've",
  "now",
  "d",
  "ll",
  "m",
  "o",
  "re",
  "ve",
  "y",
  "ain",
  "aren",
  "aren't",
  "couldn",
  "couldn't",
  "didn",
  "didn't",
  "doesn",
  "doesn't",
  "hadn",
  "hadn't",
  "hasn",
  "hasn't",
  "haven",
  "haven't",
  "isn",
  "isn't",
  "ma",
  "mightn",
  "mightn't",
  "mustn",
  "mustn't",
  "needn",
  "needn't",
  "shan",
  "shan't",
  "shouldn",
  "shouldn't",
  "won",
  "won't",
  "wouldn",
  "wouldn't",
  "would",
  "could",
  "should",
  "really",
  "like",
  "think",
  "know",
  "want",
  "need",
  "good",
  "great",
  "thanks",
  "thank",
  "please",
  "sorry",
  "yes",
  "no",
  "ok",
  "okay",
  "sure",
  "chatgpt",
  "gpt",
  "ai",
  "assistant",
  "help",
])

interface ConversationMessage {
  content?: {
    content_type?: string
    parts?: (string | { text?: string })[]
  }
}

interface ConversationData {
  mapping?: Record<string, { message?: ConversationMessage }>
}

export const extractWordsFromConversations = async (
  conversationsData: ConversationData[],
  numWordsLimit: number,
): Promise<Analysis> => {
  let allText = ""
  let conversationCount = 0
  let messageCount = 0

  try {
    for (const conversation of conversationsData) {
      if (conversation.mapping) {
        conversationCount++
        for (const msgId in conversation.mapping) {
          const messageData = conversation.mapping[msgId]
          if (messageData.message) {
            const message = messageData.message
            messageCount++
            if (message.content) {
              const contentType = message.content.content_type
              const parts = message.content.parts
              if (parts) {
                if (contentType === "text" || contentType === "code") {
                  allText += parts.join(" ") + " "
                } else if (contentType === "multimodal_text") {
                  for (const part of parts) {
                    if (typeof part === "string") {
                      allText += part + " "
                    } else if (typeof part === "object" && part && 'text' in part && part.text) {
                      allText += part.text + " "
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    const cleanedText = allText.toLowerCase().replace(/[^a-z\s]/g, "")
    const tokens = cleanedText.match(/\b\w+\b/g) || []
    const filteredWords = tokens.filter((word) => {
      return /^[a-z]+$/.test(word) && !stopWords.has(word)
    })

    const wordFreq: Record<string, number> = {}
    for (const word of filteredWords) {
      wordFreq[word] = (wordFreq[word] || 0) + 1
    }

    const sortedWords = Object.entries(wordFreq).sort(([, freqA], [, freqB]) => freqB - freqA)
    const mostCommonWords = sortedWords.slice(0, numWordsLimit)

    return {
      total_conversations: conversationCount,
      total_messages: messageCount,
      total_words: filteredWords.length,
      unique_words: Object.keys(wordFreq).length,
      words: mostCommonWords,
    }
  } catch (e) {
    console.error(`Error in extractWordsFromConversations: ${e}`)
    throw e
  }
}

export const getWordCountWarning = (count: number): WordCountWarning => {
  if (count <= 800) {
    return { text: "Optimal performance. Enjoy the visualization!", color: "text-green-400" }
  } else if (count <= 1500) {
    return { text: "Moderate performance impact. May be slower on older devices.", color: "text-yellow-400" }
  } else {
    return {
      text: "High performance impact! May cause significant slowdowns or crashes on some devices.",
      color: "text-red-400",
    }
  }
}
