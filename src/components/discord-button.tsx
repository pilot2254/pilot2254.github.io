"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { siteConfig } from "@/config/site"

export function DiscordButton() {
  const handleClick = () => {
    navigator.clipboard.writeText(siteConfig.links.discord)
    alert("Discord username copied to clipboard!")
  }

  return (
    <Button variant="outline" size="lg" onClick={handleClick}>
      <MessageCircle className="mr-2 h-5 w-5" />
      Discord
    </Button>
  )
}
