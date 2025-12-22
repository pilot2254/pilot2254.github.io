import Image from "next/image"
import { siteConfig } from "@/config/site"
import {
  Twitter,
  Github,
  MessageSquare,
  DollarSign,
  Gamepad2,
  Coffee,
  MessageCircleMore
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `About - ${siteConfig.name}`,
  description: "Game developer and reverse engineer based in Slovakia. Learning Unity, Unreal, and low-level programming.",
  openGraph: {
    title: `About - ${siteConfig.name}`,
    description: "Game developer and reverse engineer based in Slovakia.",
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
      <h1 className="text-3xl font-bold text-white">About Me</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-4 text-zinc-300 leading-relaxed">
          <p>
            Hi there, I'm Mike.<br />
            16 years old developer based in Slovakia. I focus on game and app development, low-level research, and open-source tooling.
          </p>

          <p>
            I currently study game development at Skyro.ai and spend my free time building projects that explore engine workflows, performance, and memory analysis. My work is research-oriented and aimed at understanding systems, debugging, and improving software resilience. Not to sell or abuse cheats.
          </p>

          <p>
            Meaning that All projects presented on my github are research or educational in nature. I do not condone cheating in live multiplayer environments. Where my work touches game security, it is to study vulnerabilities, learn defensive techniques, and responsibly disclose findings.
          </p>

          <p>
            I used to create websites, but now I focus solely on game development and reverse engineering. And I'm not planning to return to web development.
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

      <div className="space-y-4 pt-8 border-t border-zinc-800">
        <h2 className="text-xl font-bold text-white">Connect</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </a>
            )
          })}
        </div>

        <div className="space-y-2 pt-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="text-sm">BTC:</span>
            <span className="text-sm font-mono">{siteConfig.social.btc}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="text-sm">ETH:</span>
            <span className="text-sm font-mono">{siteConfig.social.eth}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
