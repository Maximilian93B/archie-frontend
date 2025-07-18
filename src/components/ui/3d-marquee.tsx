"use client"

import type React from "react"
import { cn } from "@/lib/utils"

export const ThreeDMarquee = ({
  images,
  className,
}: {
  images: string[]
  className?: string
}) => {
  // Split the images array into 4 equal parts
  const chunkSize = Math.ceil(images.length / 4)
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize
    return images.slice(start, start + chunkSize)
  })

  return (
    <div className={cn("mx-auto block h-[600px] overflow-hidden rounded-2xl max-sm:h-100", className)}>
      <div className="flex size-full items-center justify-center">
        <div className="size-[1720px] shrink-0 scale-50 sm:scale-75 lg:scale-100">
          <div
            style={{
              transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
            }}
            className="relative top-96 right-[50%] grid size-full origin-top-left grid-cols-4 gap-8 transform-3d"
          >
            {chunks.map((subarray, colIndex) => (
              <div
                key={colIndex + "marquee"}
                className="flex flex-col items-start gap-8"
                style={{
                  animation: `marquee-${colIndex % 2 === 0 ? 'up' : 'down'} ${colIndex % 2 === 0 ? 80 : 90}s linear infinite`,
                  willChange: "transform",
                }}
              >
                {/* First set of images */}
                {subarray.map((image, imageIndex) => (
                  <div 
                    className="relative group" 
                    key={`first-${imageIndex}-${image}`}
                    style={{ willChange: "transform" }}
                  >
                    <img
                      src={image}
                      alt={`Image ${imageIndex + 1}`}
                      className="aspect-[970/700] rounded-lg object-cover bg-white border border-gray-200 transition-all duration-500 ease-out group-hover:shadow-xl group-hover:border-gray-300 group-hover:scale-105 group-hover:-translate-y-2"
                      width={970}
                      height={700}
                      loading="lazy"
                    />
                  </div>
                ))}
                
                {/* Duplicate set for seamless loop */}
                {subarray.map((image, imageIndex) => (
                  <div 
                    className="relative group" 
                    key={`second-${imageIndex}-${image}`}
                    style={{ willChange: "transform" }}
                  >
                    <img
                      src={image}
                      alt={`Image ${imageIndex + 1}`}
                      className="aspect-[970/700] rounded-lg object-cover bg-white border border-gray-200 transition-all duration-500 ease-out group-hover:shadow-xl group-hover:border-gray-300 group-hover:scale-105 group-hover:-translate-y-2"
                      width={970}
                      height={700}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
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
          "--background": "#f9fafb", // gray-50
          "--color": "rgba(0, 0, 0, 0.1)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px",
          "--color-dark": "rgba(255, 255, 255, 0.1)",
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
          "--background": "#f9fafb", // gray-50
          "--color": "rgba(0, 0, 0, 0.1)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px",
          "--color-dark": "rgba(255, 255, 255, 0.1)",
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
