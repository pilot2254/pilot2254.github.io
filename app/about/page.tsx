import Image from "next/image"
import { siteConfig } from "@/config/site"
import {
  Twitter,
  Github,
  Send,
  DollarSign,
  Gamepad2,
  Coffee
} from "lucide-react"

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
      icon: Send
    },
    {
      name: "Reddit",
      href: siteConfig.social.reddit,
      icon: Github
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
      <h1 className="text-3xl font-bold text-white">About</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-4 text-zinc-300 leading-relaxed">
          <p>
            Your bio here. Talk about yourself, your experience, what you do, etc.
          </p>

          <p>
            Another paragraph about your background, interests, or current work.
          </p>

          <p>
            More details about your journey, achievements, or what drives you.
          </p>
        </div>

        <div className="flex-shrink-0">
          <Image
            src="/images/profile/avatar.jpg"
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
