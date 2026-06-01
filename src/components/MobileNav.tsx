"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Bell } from "lucide-react";

const LINKS = [
  { href: "/#how", label: "How it works" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/#trust", label: "Safety" },
  { href: "/privacy", label: "Privacy" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/safeguarding", label: "Safeguarding" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10 text-white active:scale-95 transition-transform"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] bg-ink-950/97 backdrop-blur-sm animate-fade-in">
          <div className="flex items-center justify-between px-5 pt-5">
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/15 ring-1 ring-brand-500/40">
                <Bell className="h-4 w-4 text-brand-300" />
              </span>
              <span className="font-display font-semibold tracking-tight text-white">SafeZone</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10 text-white active:scale-95 transition-transform"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="px-5 mt-10 flex flex-col">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-4 text-2xl font-display font-semibold text-ink-200 hover:text-white border-b border-white/5"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/demo"
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-4 font-medium text-white glow"
            >
              Try the interactive demo
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
