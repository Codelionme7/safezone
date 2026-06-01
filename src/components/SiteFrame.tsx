import Link from "next/link";
import { Bell } from "lucide-react";
import { MobileNav } from "./MobileNav";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2">
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/15 ring-1 ring-brand-500/40">
        <Bell className="h-4 w-4 text-brand-300" />
        <span className="absolute inset-0 rounded-lg ring-2 ring-brand-500/30 animate-pulse-ring" />
      </span>
      <span className="font-display font-semibold tracking-tight">SafeZone</span>
    </Link>
  );
}

export function SiteNav() {
  return (
    <nav className="relative z-10 max-w-6xl mx-auto px-6 pt-6 flex items-center justify-between">
      <Logo />
      <div className="hidden md:flex items-center gap-7 text-sm text-ink-300">
        <Link href="/#how" className="hover:text-white transition-colors">
          How it works
        </Link>
        <Link href="/volunteer" className="hover:text-white transition-colors">
          Volunteer
        </Link>
        <Link href="/#trust" className="hover:text-white transition-colors">
          Safety
        </Link>
        <Link href="/privacy" className="hover:text-white transition-colors">
          Privacy
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="/demo"
          className="hidden md:inline-flex text-sm rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10 px-3.5 py-2 transition-colors"
        >
          Try demo →
        </Link>
        <MobileNav />
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-ink-400">
        <div className="flex items-center gap-2">
          <Logo />
          <span>— MVP preview</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link href="/volunteer" className="hover:text-white transition-colors">
            Volunteer
          </Link>
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="/disclaimer" className="hover:text-white transition-colors">
            Disclaimer
          </Link>
          <Link href="/safeguarding" className="hover:text-white transition-colors">
            Safeguarding
          </Link>
        </div>
      </div>
    </footer>
  );
}
