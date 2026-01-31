"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogOverlay,
  DialogTitle,
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

      <Dialog open={isOpen} onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) setIsZoomed(false) // Reset zoom when closing
      }}>
        <DialogPortal>
          <DialogOverlay />
          <button
            onClick={() => setIsOpen(false)}
            className="fixed top-4 right-4 z-[100] text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <DialogContent
            className="max-w-[95vw] max-h-[95vh] p-0 border-0 bg-transparent"
            showCloseButton={false}
          >
            <DialogTitle className="sr-only">{alt || "Image"}</DialogTitle>
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={src}
                alt={alt}
                className={`max-w-full max-h-[90vh] object-contain rounded-lg transition-transform duration-200 ${
                  isZoomed ? 'scale-200 cursor-zoom-out' : 'cursor-zoom-in' // still deciding whether to put `scale-200` instead of `scale-150` (sizing like `1.0x -> 1.5x / 2.0x`)
                                                                            // or maybe i can make it to automatically size up and down, so there wont be any uhh... you know
                                                                            //
                                                                            // also, there are some problems with responsiveness on smaller screens
                                                                            // - this can be resolved by adding option to drag the image when its too big, or smth
                                                                            //  - something that discord has
                }`}
                onClick={(e) => {
                  e.stopPropagation()
                  setIsZoomed(!isZoomed)
                }}
              />
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  )
}
