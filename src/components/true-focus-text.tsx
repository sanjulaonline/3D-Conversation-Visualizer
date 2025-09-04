"use client"

import { useEffect, useRef } from "react"

interface TrueFocusTextProps {
  text: string
  className?: string
  delay?: number
}

export default function TrueFocusText({ text, className = "", delay = 0 }: TrueFocusTextProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const timer = setTimeout(() => {
      element.style.filter = "blur(0px)"
      element.style.opacity = "1"
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <span
      ref={ref}
      className={`inline-block transition-all duration-1000 ease-out ${className}`}
      style={{
        filter: "blur(8px)",
        opacity: "0",
        transform: "translateY(20px)",
      }}
    >
      {text}
    </span>
  )
}
