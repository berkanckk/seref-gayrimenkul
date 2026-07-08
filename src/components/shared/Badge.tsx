import * as React from "react"
import { cn } from "@/lib/utils"

export type BadgeVariant = "satilik" | "kiralik" | "featured" | "new"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant: BadgeVariant
  children: React.ReactNode
}

const variantStyles: Record<BadgeVariant, string> = {
  satilik: "bg-primary-green text-white border-transparent",
  kiralik: "bg-blue-600 text-white border-transparent",
  featured: "bg-amber-500 text-white border-transparent font-bold",
  new: "bg-emerald-500 text-white border-transparent",
}

export default function Badge({ variant, children, className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider font-body border shadow-card",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
