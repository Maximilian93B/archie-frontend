"use client"

import { cn } from "@/lib/utils"
import { motion } from "motion/react"

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
}) => {
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    }
  })
  
  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{
                    opacity: 0,
                    y: 15,
                    filter: "blur(4px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.04,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className={cn(`inline-block`, word.className)}
                  key={`char-${index}`}
                  style={{ 
                    willChange: "transform, opacity, filter",
                    transform: "translateZ(0)"
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className={cn("inline-flex items-baseline", className)}>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="overflow-hidden"
        style={{ willChange: "opacity" }}
      >
        <div className="inline-flex items-baseline">
          {renderWords()}
        </div>
      </motion.div>
    </div>
  )
}