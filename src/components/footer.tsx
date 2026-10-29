"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiArrowUpRight,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/destinations" },
    { label: "My Bookings", href: "/my-bookings" },
    { label: "My Profile", href: "/profile" },
  ];

  const supportLinks = [
    { label: "Help Center", href: "/help-center" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ];

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    // Connect your newsletter API here.
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="w-full bg-[#0c0b0b] text-white">
      <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-12">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-8 py-9 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-10 lg:grid-cols-[1.7fr_1fr_1fr_1fr] lg:gap-12 lg:py-11">
          {/* Brand and Newsletter */}
          <div className="flex flex-col items-start">
            <Link
              href="/"
              className="font-serif text-4xl font-bold leading-none tracking-tight sm:text-5xl"
            >
              Wanderlast
            </Link>

            <p className="mt-2 text-[10px] leading-relaxed text-white/60 sm:text-xs">
              Your gateway to extraordinary travel experiences around the
              world.
            </p>

            {/* Newsletter */}
            <div className="mt-7 w-full max-w-xs">
              <h3 className="font-serif text-[10px] uppercase tracking-wide text-white/90">
                Newsletter
              </h3>

              <p className="mt-1 text-[9px] leading-relaxed text-white/50">
                Subscribe for exclusive travel deals and inspiration.
              </p>

              <form
                onSubmit={handleSubscribe}
                className="mt-3 flex w-full items-center bg-[#303030] px-2 py-1"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSubscribed(false);
                  }}
                  placeholder="Enter email"
                  aria-label="Email address"
                  required
                  className="h-7 min-w-0 flex-1 bg-transparent text-[10px] text-white outline-none placeholder:text-white/50"
                />

                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="flex h-7 w-7 shrink-0 items-center justify-center text-white transition-colors hover:text-white/60"
                >
                  <FiArrowUpRight size={15} />
                </button>
              </form>

              {subscribed && (
                <p className="mt-2 text-[10px] text-green-400">
                  Thank you for subscribing!
                </p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-serif text-[10px] uppercase tracking-wide text-white/90">
              Quick Links
            </h3>

            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[10px] text-white/60 transition-colors hover:text-white sm:text-xs"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 font-serif text-[10px] uppercase tracking-wide text-white/90">
              Support
            </h3>

            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[10px] text-white/60 transition-colors hover:text-white sm:text-xs"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="mb-4 font-serif text-[10px] uppercase tracking-wide text-white/90">
              Contact Us
            </h3>

            <div className="space-y-2.5 text-[10px] text-white/60 sm:text-xs">
              <a
                href="tel:7869011622"
                className="block transition-colors hover:text-white"
              >
                786 901 1622
              </a>

              <a
                href="mailto:info@wanderland.com"
                className="block break-all transition-colors hover:text-white"
              >
                info@wanderland.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[9px] text-white/50">
            © {new Date().getFullYear()} Wanderlast. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="text-white/80 transition-colors hover:text-white"
            >
              <FaXTwitter size={13} />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/80 transition-colors hover:text-white"
            >
              <FiLinkedin size={13} />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/80 transition-colors hover:text-white"
            >
              <FiInstagram size={13} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;