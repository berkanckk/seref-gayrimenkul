import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionTitleProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: "left" | "center"
  className?: string
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionTitleProps) {
  const isCenter = align === "center"

  return (
    <div className={cn("flex flex-col mb-8 md:mb-12", isCenter ? "items-center text-center" : "items-start text-left", className)}>
      {eyebrow && (
        <span className="text-xs font-bold uppercase tracking-wider text-primary-green mb-2.5">
          {eyebrow}
        </span>
      )}
      
      <h2 
        className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary leading-tight font-sans"
      >
        {title}
      </h2>

      {subtitle && (
        <p className={cn("text-base text-text-muted max-w-2xl leading-relaxed mt-3 font-medium font-body")}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
