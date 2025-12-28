"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { X } from "lucide-react"

interface ImageModalProps {
  src: string
  alt: string
}

export function ImageModal({ src, alt }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <>
      <img
        src={src}
        alt={alt}
        className="rounded-lg my-4 max-w-full cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => setIsOpen(true)}
      />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="max-w-[95vw] max-h-[95vh] p-0 border-0 bg-transparent"
          showCloseButton={false}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={src}
              alt={alt}
              className={`max-w-full max-h-[90vh] object-contain rounded-lg transition-transform duration-200 ${
                isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={(e) => {
                e.stopPropagation()
                setIsZoomed(!isZoomed)
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
