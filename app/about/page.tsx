import Image from "next/image"
import { siteConfig } from "@/config/site"
import {
  Twitter,
  DollarSign,
  Gamepad2,
  Coffee,
  MessageCircleMore
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `About - ${siteConfig.name}`,
  description: "17 year old game developer and reverse engineer based in Slovakia. Learning Unity, Unreal, and low-level programming.",
  openGraph: {
    title: `About - ${siteConfig.name}`,
    description: "17 year old game developer and reverse engineer based in Slovakia.",
    url: `${siteConfig.url}/about`,
  },
}

export default function AboutPage() {
  const socialLinks = [
    {
      name: "Twitter",
      href: siteConfig.social.twitter,
      icon: Twitter
    },
    {
      name: "Discord",
      href: `https://discord.com/users/${siteConfig.social.discord}`,
      icon: MessageCircleMore
    },
    {
      name: "Reddit",
      href: siteConfig.social.reddit,
      icon: MessageCircleMore
    },
    {
      name: "Steam",
      href: siteConfig.social.steam,
      icon: Gamepad2
    },
    {
      name: "PayPal",
      href: siteConfig.social.paypal,
      icon: DollarSign
    },
    {
      name: "Ko-fi",
      href: siteConfig.social.kofi,
      icon: Coffee
    },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">About Me</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-4 text-foreground leading-relaxed">
          <p>
            Hi there, I'm Mike.<br />
            17 years old, based in Slovakia. I do game dev, low-level research, and build tools that probably shouldn't exist but do anyway.
          </p>

          <p>
            I currently study game development at <a href="https://skyro.ai/" target="_blank" className="underline hover:text-muted-foreground transition-colors">skyro.ai</a> and spend my free time digging into engine workflows, performance optimization, and memory analysis. Everything I put on GitHub is educational or research-based.
          </p>

          <p>
            I research game cheats as a hobby. Not to sell them or ruin lobbies, but because reverse engineering is fucking interesting. I'm more into the cheat side than anti-cheat right now, but honestly both require the same creative mindset. It's a cat and mouse game, and I'm just here to watch (and participate in) how it evolves.
          </p>

          <p>
            And yes, I used to do web development, made websites for clients and all that. Not doing that anymore. Switched entirely to game dev and reverse engineering, and I'm not going back.
          </p>
        </div>

        <div className="flex-shrink-0">
          <Image
            src="https://avatars.githubusercontent.com/pilot2254"
            alt={siteConfig.name}
            width={200}
            height={200}
            className="rounded-full"
          />
        </div>
      </div>

      <div className="space-y-4 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-foreground">Connect</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </a>
            )
          })}
        </div>

        <div className="space-y-2 pt-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-sm">BTC:</span>
            <span className="text-sm font-mono">{siteConfig.social.btc}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-sm">ETH:</span>
            <span className="text-sm font-mono">{siteConfig.social.eth}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
