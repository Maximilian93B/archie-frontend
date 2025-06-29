"use client"

import type React from "react"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export const ThreeDMarquee = ({
  images,
  className,
}: {
  images: string[]
  className?: string
}) => {
  // Create 4 columns for balanced density and card size
  const chunkSize = Math.ceil(images.length / 4)
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize
    return images.slice(start, start + chunkSize)
  })

  return (
    <div className={cn("absolute inset-0 w-full h-full overflow-hidden", className)}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[2800px] h-[2800px] shrink-0 scale-45 sm:scale-55 md:scale-70 lg:scale-85">
          <div
            style={{
              transform: "rotateX(60deg) rotateY(0deg) rotateZ(-45deg)",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full grid grid-cols-4 gap-1 transform-3d"
          >
            {chunks.map((subarray, colIndex) => (
              <motion.div
                animate={{ 
                  y: colIndex % 2 === 0 ? [0, -80, -160, -80, 0] : [0, 80, 160, 80, 0]
                }}
                transition={{
                  duration: 20 + colIndex * 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: [0.25, 0.1, 0.25, 1],
                  times: [0, 0.25, 0.5, 0.75, 1],
                }}
                key={colIndex + "marquee"}
                className="flex flex-col items-center gap-1 -mx-6"
              >
                <GridLineVertical className="left-0" offset="20px" />
                {subarray.map((image, imageIndex) => (
                  <div className="relative -my-1" key={imageIndex + image}>
                    <GridLineHorizontal className="top-0" offset="8px" />
                    <motion.img
                      whileHover={{
                        y: -12,
                        rotateX: -3,
                        rotateY: 3,
                        scale: 1.05,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      key={imageIndex + image}
                      src={image}
                      alt={`Image ${imageIndex + 1}`}
                      className="aspect-[3/4] w-60 rounded-xl object-cover ring ring-neutral-950/5 shadow-lg shadow-neutral-900/25 hover:shadow-xl hover:shadow-neutral-900/35 transition-all duration-400"
                      width={240}
                      height={320}
                    />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string
  offset?: string
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.08)",
          "--height": "1px",
          "--width": "2px",
          "--fade-stop": "94%",
          "--offset": offset || "200px",
          "--color-dark": "rgba(255, 255, 255, 0.08)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  )
}

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string
  offset?: string
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.08)",
          "--height": "2px",
          "--width": "1px",
          "--fade-stop": "94%",
          "--offset": offset || "150px",
          "--color-dark": "rgba(255, 255, 255, 0.08)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  )
}
