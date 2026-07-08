"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  if (totalPages <= 1) return null

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return

    const params = new URLSearchParams(searchParams.toString())
    if (page === 1) {
      params.delete("sayfa")
    } else {
      params.set("sayfa", page.toString())
    }

    router.push(`/ilanlar?${params.toString()}`)
  }

  // Generate range of page numbers to show
  const getPageNumbers = () => {
    const pages: number[] = []
    const range = 2 // Number of pages to show before and after current page

    let start = Math.max(1, currentPage - range)
    let end = Math.min(totalPages, currentPage + range)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav className="flex justify-center items-center gap-1.5 py-8 font-body text-xs font-bold" aria-label="Sayfalama">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 rounded-lg bg-white border border-border-light text-text-primary hover:bg-bg-soft flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white cursor-pointer shadow-subtle"
        aria-label="Önceki Sayfa"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Page Numbers */}
      {currentPage - 2 > 1 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className="w-9 h-9 rounded-lg bg-white border border-border-light text-text-primary hover:bg-bg-soft flex items-center justify-center transition-colors cursor-pointer shadow-subtle"
          >
            1
          </button>
          {currentPage - 2 > 2 && (
            <span className="w-9 h-9 flex items-center justify-center text-text-muted">...</span>
          )}
        </>
      )}

      {pageNumbers.map((page) => {
        const isActive = page === currentPage
        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            aria-current={isActive ? "page" : undefined}
            className={`w-9 h-9 rounded-lg transition-colors flex items-center justify-center cursor-pointer shadow-subtle ${
              isActive
                ? "bg-primary-green text-white"
                : "bg-white border border-border-light text-text-primary hover:bg-bg-soft"
            }`}
          >
            {page}
          </button>
        )
      })}

      {currentPage + 2 < totalPages && (
        <>
          {currentPage + 2 < totalPages - 1 && (
            <span className="w-9 h-9 flex items-center justify-center text-text-muted">...</span>
          )}
          <button
            onClick={() => handlePageChange(totalPages)}
            className="w-9 h-9 rounded-lg bg-white border border-border-light text-text-primary hover:bg-bg-soft flex items-center justify-center transition-colors cursor-pointer shadow-subtle"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 rounded-lg bg-white border border-border-light text-text-primary hover:bg-bg-soft flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white cursor-pointer shadow-subtle"
        aria-label="Sonraki Sayfa"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}
