'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Instagram, Linkedin, Youtube } from 'lucide-react'
import Threads from '@animations/Threads'
import FooterContactForm from '@/components/FooterContactForm'

export default function Footer() {
  return (
    <>
      {/* Include the Threads effect touching the footer */}
      <div className="w-full h-full relative bg-transparent mb-[-329px] mt-[-130px]">
        <div className="absolute inset-0 z-10">
          <Threads color={[7, 2, 9]} amplitude={1} distance={0.1} enableMouseInteraction={true} />
        </div>
      </div>

      <footer className="bg-background text-foreground py-20 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="sm:col-span-2 lg:col-span-1 xl:col-span-1 flex flex-col">
              <Link href="/" className="inline-block mb-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/devx-logo-main-light-qTrRkjnHwbdPvqPRaKWQzeV7Emn14i.png"
                  alt="DevX Logo"
                  width={180}
                  height={48}
                  className="h-8 w-auto"
                />
              </Link>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm leading-relaxed">
                California-based software development company specializing in custom software, AI/ML, IoT hardware, and digital transformation services.
              </p>
              <div className="flex space-x-4 mt-auto">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-white/5 rounded-lg"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-white/5 rounded-lg"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-white/5 rounded-lg"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-white/5 rounded-lg"
                  aria-label="X"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Services and Company - Side by side on mobile when space allows */}
            <div className="sm:hidden grid grid-cols-2 gap-4 col-span-1">
              {/* Services */}
              <div className="min-w-0">
                <h3 className="text-base font-bold mb-4">Services</h3>
                <div className="space-y-2">
                  <Link href="/services" className="block text-sm text-muted-foreground hover:text-primary transition-colors truncate">
                    Custom Software
                  </Link>
                  <Link href="/services" className="block text-sm text-muted-foreground hover:text-primary transition-colors truncate">
                    AI & ML
                  </Link>
                  <Link href="/services" className="block text-sm text-muted-foreground hover:text-primary transition-colors truncate">
                    IoT Hardware
                  </Link>
                  <Link href="/services" className="block text-sm text-muted-foreground hover:text-primary transition-colors truncate">
                    Digital Transform
                  </Link>
                  <Link href="/services" className="block text-sm text-muted-foreground hover:text-primary transition-colors truncate">
                    Web Development
                  </Link>
                </div>
              </div>

              {/* Company */}
              <div className="min-w-0">
                <h3 className="text-base font-bold mb-4">Company</h3>
                <div className="space-y-2">
                  <Link href="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors truncate">
                    About Us
                  </Link>
                  <Link href="/portfolio" className="block text-sm text-muted-foreground hover:text-primary transition-colors truncate">
                    Portfolio
                  </Link>
                  <Link href="/pricing" className="block text-sm text-muted-foreground hover:text-primary transition-colors truncate">
                    Pricing
                  </Link>
                  <Link href="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors truncate">
                    Contact
                  </Link>
                  <Link href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative" className="block text-sm text-muted-foreground hover:text-primary transition-colors truncate">
                    Schedule Call
                  </Link>
                </div>
              </div>
            </div>

            {/* Services - Hidden on mobile, shown on sm+ */}
            <div className="hidden sm:block lg:col-span-1 xl:col-span-1 min-w-0">
              <h3 className="text-base font-bold mb-4 lg:mb-6">Services</h3>
              <div className="space-y-2 lg:space-y-3">
                <Link href="/services" className="block text-sm text-muted-foreground hover:text-primary transition-colors truncate">
                  Custom Software
                </Link>
                <Link href="/services" className="block text-sm text-muted-foreground hover:text-primary transition-colors truncate">
                  AI & Machine Learning
                </Link>
                <Link href="/services" className="block text-sm text-muted-foreground hover:text-primary transition-colors truncate">
                  IoT Hardware
                </Link>
                <Link href="/services" className="block text-sm text-muted-foreground hover:text-primary transition-colors truncate">
                  Digital Transformation
                </Link>
                <Link href="/services" className="block text-sm text-muted-foreground hover:text-primary transition-colors truncate">
                  Web Development
                </Link>
              </div>
            </div>

            {/* Company - Hidden on mobile, shown on sm+ */}
            <div className="hidden sm:block lg:col-span-1 xl:col-span-1 min-w-0">
              <h3 className="text-base font-bold mb-4 lg:mb-6">Company</h3>
              <div className="space-y-2 lg:space-y-3">
                <Link href="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors truncate">
                  About Us
                </Link>
                <Link href="/portfolio" className="block text-sm text-muted-foreground hover:text-primary transition-colors truncate">
                  Portfolio
                </Link>
                <Link href="/pricing" className="block text-sm text-muted-foreground hover:text-primary transition-colors truncate">
                  Pricing
                </Link>
                <Link href="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors truncate">
                  Contact
                </Link>
                <Link href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative" className="block text-sm text-muted-foreground hover:text-primary transition-colors truncate">
                  Schedule Call
                </Link>
              </div>
            </div>

            {/* Contact Form */}
            <div className="sm:col-span-2 lg:col-span-3 xl:col-span-1">
              <FooterContactForm />
            </div>
          </div>

          {/* Contact Info Bar */}
          <div className="mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-border">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex lg:items-center gap-3 lg:gap-6 text-sm text-muted-foreground">
                <span className="flex items-center justify-center sm:justify-start gap-2">
                  📞 <span className="truncate">+1 (442)544-0591</span>
                </span>
                <span className="flex items-center justify-center sm:justify-start gap-2">
                  ✉️ <span className="truncate">support@devxgroup.io</span>
                </span>
                <span className="flex items-center justify-center sm:justify-start gap-2">
                  📍 <span className="truncate">San Diego, California</span>
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 text-sm border-t sm:border-t-0 pt-4 sm:pt-0">
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-center sm:text-left">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors text-center sm:text-left">
                  Terms of Service
                </Link>
                <Link href="/sitemap.xml" className="text-muted-foreground hover:text-primary transition-colors text-center sm:text-left">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 lg:mt-10 -mb-16 border-t border-border pt-4 flex justify-center items-center">
            <p className="text-xs text-muted-foreground text-center">© {new Date().getFullYear()} DevX Group LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
