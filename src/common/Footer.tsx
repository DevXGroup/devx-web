'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Company Info */}
            <div className="flex flex-col">
              <Link href="/" className="inline-block mb-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/devx-logo-main-light-qTrRkjnHwbdPvqPRaKWQzeV7Emn14i.png"
                  alt="DevX Logo"
                  width={180}
                  height={48}
                  className="h-8 w-auto"
                />
              </Link>
              <p className="text-sm text-muted-foreground mb-6">
                Connect with us on social media to explore our portfolio and discover our latest
                projects and exciting announcements.
              </p>
              <div className="flex space-x-6 mt-auto">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-base font-bold mb-6">Contact Us</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>Voice Message: 858-519-8343</p>
                <p>email: devxgroupllc[at]gmail.com</p>
                <p>Free initial consultation</p>
                <p>for a quick Q&amp;A &amp; alignment schedule your appointment</p>
              </div>
            </div>

            {/* Contact Form */}
            <FooterContactForm />
          </div>

          <div className="mt-10 -mb-16 border-t border-border pt-4 flex justify-center items-center">
            <p className="text-xs text-muted-foreground">© 2025. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
