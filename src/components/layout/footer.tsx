import Link from "next/link"
import Image from "next/image"
import {
  Facebook,
  Instagram,
  Youtube,
  Twitch,
  Twitter,
  MapPin,
  Phone,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/parties", label: "Parties" },
  { href: "/rates", label: "Rates" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const

const gamingLinks = [
  { href: "/book-stations", label: "Book Stations" },
  { href: "/events", label: "Tournaments" },
  { href: "/events", label: "Weekly Events" },
  { href: "/about", label: "STEM Programs" },
] as const

const socialLinks = [
  {
    href: "https://facebook.com/Bakersfield-ESports-104418741131608",
    label: "Facebook",
    icon: Facebook,
  },
  {
    href: "https://twitter.com/Bak_eSports",
    label: "X (Twitter)",
    icon: Twitter,
  },
  {
    href: "https://instagram.com/bakersfieldesports",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://youtube.com/channel/UCZvHOMf6jzLVp4Rf3A_fd1A",
    label: "YouTube",
    icon: Youtube,
  },
  {
    href: "https://twitch.tv/bakersfieldesportscenter",
    label: "Twitch",
    icon: Twitch,
  },
  {
    href: "https://tiktok.com/@bakersfieldesportscenter",
    label: "TikTok",
    icon: null,
  },
  {
    href: "https://discord.gg/jbzWH3ZvRp",
    label: "Discord",
    icon: null,
  },
] as const

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Quick Links */}
          <div>
            <h3 className="font-orbitron text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Gaming */}
          <div>
            <h3 className="font-orbitron text-sm font-semibold uppercase tracking-wider text-foreground">
              Gaming
            </h3>
            <ul className="mt-4 space-y-2">
              {gamingLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-orbitron text-sm font-semibold uppercase tracking-wider text-foreground">
              Connect
            </h3>
            <ul className="mt-4 space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                    aria-label={`Follow us on ${link.label}`}
                  >
                    {link.icon ? (
                      <link.icon className="h-4 w-4" />
                    ) : (
                      <span className="flex h-4 w-4 items-center justify-center text-xs font-bold">
                        {link.label.charAt(0)}
                      </span>
                    )}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit Us */}
          <div>
            <h3 className="font-orbitron text-sm font-semibold uppercase tracking-wider text-foreground">
              Visit Us
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="https://maps.google.com/?q=7104+Golden+State+Hwy+Bakersfield+CA+93308"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  aria-label="Get directions to Bakersfield eSports Center"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    7104 Golden State Hwy
                    <br />
                    Bakersfield, CA 93308
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+16615297447"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  aria-label="Call Bakersfield eSports Center"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  (661) 529-7447
                </a>
              </li>
              <li className="inline-flex items-start gap-2 text-sm text-muted-foreground">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  Sun - Thu: 12 PM - 11 PM
                  <br />
                  Fri - Sat: 12 PM - 12 AM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border/40 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <Image
                src="/images/bec-logo-white.svg"
                alt="Bakersfield eSports Center"
                width={120}
                height={30}
                className="h-8 w-auto"
              />
              <p className="text-sm text-muted-foreground">
                &copy; {currentYear} All rights reserved.
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Powered by passion for gaming
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
