"use client"

import { useState } from "react"
import { Link, Check } from "lucide-react"

export function CopyLink() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 hover:text-foreground transition-colors"
      aria-label="Copy link"
    >
      {copied ? (
        <>
          <Check className="w-3 h-3" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Link className="w-3 h-3" />
          <span>Copy link</span>
        </>
      )}
    </button>
  )
}
