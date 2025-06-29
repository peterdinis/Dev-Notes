"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "~/lib/utils"
import { Button } from "../ui/button"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <Button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 z-50 rounded-full p-2 shadow-lg transition-opacity",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      size="icon"
      variant="secondary"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  )
}
