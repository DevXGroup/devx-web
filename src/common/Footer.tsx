'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import Threads from '@/components/Threads'

export default function Footer() {
  return (
    <>
      {/* Include the Threads effect touching the footer */}
      <div className="w-full h-full relative bg-transparent mb-[-399px] mt-[-250px]">
        <div className="absolute inset-0 z-10">
          <Threads
            color={[7, 2, 9]}
            amplitude={0.75}
            distance={0.01}
            enableMouseInteraction={true}
          />
        </div>
      </div>

      <footer className="bg-background text-foreground py-16 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

        <div className="container mx-auto px-4 relative">
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
            <div>
              <h3 className="text-base font-bold mb-4">Achieve Today</h3>
              <form className="space-y-3">
                <div>
                  <p className="mb-1 text-sm">Get in touch with us*</p>
                  <Input
                    type="email"
                    placeholder="Enter your email address here"
                    className="bg-secondary border-secondary text-secondary-foreground placeholder:text-muted-foreground text-sm"
                  />
                </div>
                <div>
                  <p className="mb-1 text-sm">Quick message*</p>
                  <Textarea
                    placeholder="Ask a quick question"
                    className="bg-secondary border-secondary text-secondary-foreground placeholder:text-muted-foreground min-h-[80px] text-sm"
                  />
                </div>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm">
                  Send message
                </Button>
              </form>
            </div>
          </div>

          <div className="mt-8 border-t border-border py-4 flex justify-center items-center">
            <p className="text-xs text-muted-foreground">© 2025. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
