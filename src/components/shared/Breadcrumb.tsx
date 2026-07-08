import * as React from "react"
import Link from "next/link"
import { Home, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex flex-wrap items-center space-x-2 text-sm font-medium text-text-muted font-body py-4", className)}
    >
      <Link
        href="/"
        className="flex items-center text-text-muted hover:text-accent transition-colors duration-200"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Ana Sayfa</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <React.Fragment key={index}>
            <ChevronRight className="h-4 w-4 text-text-subtle flex-shrink-0" />
            {isLast || !item.href ? (
              <span className="text-primary font-semibold" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-text-muted hover:text-accent transition-colors duration-200"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
