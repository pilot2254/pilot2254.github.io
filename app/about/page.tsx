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
  description: "17 year old game developer and reverse engineer based in Slovakia. Learning Unreal Engine, C++, and low-level programming.",
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
            I'm Mike. 17, based in Slovakia. I do game dev, reverse engineering, and low-level programming.
            I used to do web development - made websites for clients, the whole thing. Stopped. Not going back.
          </p>

          <p>
            Right now I'm studying game development at <a href="https://skyro.ai/" target="_blank" className="underline hover:text-muted-foreground transition-colors">skyro.ai</a> and
            building <a href="https://github.com/redfox-studios/Bomberman3D" target="_blank" className="underline hover:text-muted-foreground transition-colors">Bomberman3D</a>, my first real Unreal Engine 5 game written in actual C++, not just Blueprints.
            It's a school project but I'm treating it like a real game.
          </p>

          <p>
            On the side I do reverse engineering. Mostly game hacking - not to sell cheats or ruin lobbies,
            but because understanding how things work under the hood is genuinely interesting.
            Memory, assembly, IL2CPP, anti-cheat systems... I find all of it more interesting than
            building another CRUD app.
          </p>

          <p>
            I try not to be an NPC about how I learn. I don't follow trends, I don't outsource my thinking to AI,
            and I actually try to solve problems before asking for help. Right now I'm a jack of all trades -
            C++, C#, reverse engineering, game dev, some assembly - not mastering any of it yet, but working on it.
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
