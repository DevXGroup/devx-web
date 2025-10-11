'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Github, Instagram, Linkedin, Youtube } from 'lucide-react'
import Threads from '@animations/Threads'
import FooterContactForm from '@/components/FooterContactForm'

export default function Footer() {
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    // Detect Safari browser
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    setIsSafari(isSafariBrowser)
  }, [])

  return (
    <>
      {/* Include the Threads effect touching the footer */}
      <div className="w-full h-[70vh] sm:h-[45vh] md:h-[50vh] lg:h-[60vh] xl:h-[70vh] relative bg-black mt-[-190px] p-0 z-999">
        <div className="absolute inset-0">
          {isSafari ? (
            <Threads
              color={[2, 1.5, 9]}
              amplitude={0.8}
              distance={0}
              enableMouseInteraction={true}
            />
          ) : (
            <Threads
              color={[2, 1.5, 9]}
              amplitude={1}
              distance={0.1}
              enableMouseInteraction={true}
            />
          )}
        </div>
      </div>

      <footer className="bg-black text-foreground relative mb-5 mt-[-90px] z-9999">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/images/patterns/grid.svg')] opacity-10"></div>

        <div className="container mx-auto relative z-20 max-w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="sm:col-span-2 lg:col-span-1 xl:col-span-1 flex flex-col">
              <Link href="/" className="inline-block mb-4">
                <Image
                  src="/images/logos/devx-logo.png"
                  alt="DevX Logo"
                  width={180}
                  height={48}
                  className="h-8 w-auto"
                />
              </Link>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm leading-relaxed font-light">
                California-based software development company specializing in custom software,
                AI/ML, IoT hardware, and digital transformation services.
              </p>
              <div className="flex space-x-4 mt-auto">
                <Link
                  href="https://www.youtube.com/channel/UC6Zqx3Bhwbberq_MEmlgpIw"
                  className="text-muted-foreground hover:text-[#4CD787] transition-colors p-2 hover:bg-white/5 rounded-md"
                  aria-label="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/devx-group-llc/"
                  className="text-muted-foreground hover:text-[#4CD787] transition-colors p-2 hover:bg-white/5 rounded-md"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link
                  href="https://github.com/DevXGroup"
                  className="text-muted-foreground hover:text-[#4CD787] transition-colors p-2 hover:bg-white/5 rounded-md"
                  aria-label="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-[#4CD787] transition-colors p-2 hover:bg-white/5 rounded-md"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-[#4CD787] transition-colors p-2 hover:bg-white/5 rounded-md"
                  aria-label="X"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Services and Company - Side by side on mobile when space allows */}
            <div className="sm:hidden grid grid-cols-2 gap-4 col-span-1">
              {/* Services */}
              <div className="min-w-0">
                <h3 className="text-base font-extrabold mb-4">Services</h3>
                <div className="space-y-2">
                  <Link
                    href="/services"
                    className="block text-sm text-muted-foreground hover:text-[#4CD787] hover:bg-white/5 rounded-md transition-colors truncate font-light"
                  >
                    Custom Software
                  </Link>
                  <Link
                    href="/services"
                    className="block text-sm text-muted-foreground hover:text-[#4CD787] hover:bg-white/5 rounded-md transition-colors truncate font-light"
                  >
                    AI & ML
                  </Link>
                  <Link
                    href="/services"
                    className="block text-sm text-muted-foreground hover:text-[#4CD787] hover:bg-white/5 rounded-md transition-colors truncate font-light"
                  >
                    IoT Hardware
                  </Link>
                  <Link
                    href="/services"
                    className="block text-sm text-muted-foreground hover:text-[#4CD787] hover:bg-white/5 rounded-md transition-colors truncate font-light"
                  >
                    Digital Transform
                  </Link>
                  <Link
                    href="/services"
                    className="block text-sm text-muted-foreground hover:text-[#4CD787] hover:bg-white/5 rounded-md transition-colors truncate font-light"
                  >
                    Web Development
                  </Link>
                </div>
              </div>

              {/* Company */}
              <div className="min-w-0">
                <h3 className="text-base font-extrabold mb-4">Company</h3>
                <div className="space-y-2">
                  <Link
                    href="/about"
                    className="block text-sm text-muted-foreground hover:text-[#4CD787] hover:bg-white/5 rounded-md transition-colors truncate font-light"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/portfolio"
                    className="block text-sm text-muted-foreground hover:text-[#4CD787] hover:bg-white/5 rounded-md transition-colors truncate font-light"
                  >
                    Portfolio
                  </Link>
                  <Link
                    href="/pricing"
                    className="block text-sm text-muted-foreground hover:text-[#4CD787] hover:bg-white/5 rounded-md transition-colors truncate font-light"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-sm text-muted-foreground hover:text-[#4CD787] hover:bg-white/5 rounded-md transition-colors truncate font-light"
                  >
                    Contact
                  </Link>
                  <Link
                    href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative"
                    className="block text-sm text-muted-foreground hover:text-[#4CD787] hover:bg-white/5 rounded-md transition-colors truncate font-light"
                  >
                    Schedule Call
                  </Link>
                </div>
              </div>
            </div>

            {/* Services - Hidden on mobile, shown on sm+ */}
            <div className="hidden sm:block lg:col-span-1 xl:col-span-1 min-w-0">
              <h3 className="text-base font-extrabold mb-4 lg:mb-6">Services</h3>
              <div className="space-y-2 lg:space-y-3">
                <Link
                  href="/services"
                  className="block text-sm text-muted-foreground hover:text-[#4CD787] hover:bg-white/5 rounded-md transition-colors truncate font-light"
                >
                  Custom Software
                </Link>
                <Link
                  href="/services"
                  className="block text-sm text-muted-foreground hover:text-[#4CD787] hover:bg-white/5 rounded-md transition-colors truncate font-light"
                >
                  AI & Machine Learning
                </Link>
                <Link
                  href="/services"
                  className="block text-sm text-muted-foreground hover:text-[#4CD787] hover:bg-white/5 rounded-md transition-colors truncate font-light"
                >
                  IoT Hardware
                </Link>
                <Link
                  href="/services"
                  className="block text-sm text-muted-foreground hover:text-[#4CD787] hover:bg-white/5 rounded-md transition-colors truncate font-light"
                >
                  Digital Transformation
                </Link>
                <Link
                  href="/services"
                  className="block text-sm text-muted-foreground hover:text-[#4CD787] hover:bg-white/5 rounded-md transition-colors truncate font-light"
                >
                  Web Development
                </Link>
              </div>
            </div>

            {/* Company - Hidden on mobile, shown on sm+ */}
            <div className="hidden sm:block lg:col-span-1 xl:col-span-1 min-w-0">
              <h3 className="text-base font-extrabold mb-4 lg:mb-6">Company</h3>
              <div className="space-y-2 lg:space-y-3">
                <Link
                  href="/about"
                  className="block text-sm text-muted-foreground hover:text-[#4CD787] hover:bg-white/5 rounded-md transition-colors truncate font-light"
                >
                  About Us
                </Link>
                <Link
                  href="/portfolio"
                  className="block text-sm text-muted-foreground hover:text-[#4CD787] hover:bg-white/5 rounded-md transition-colors truncate font-light"
                >
                  Portfolio
                </Link>
                <Link
                  href="/pricing"
                  className="block text-sm text-muted-foreground hover:text-[#4CD787] hover:bg-white/5 rounded-md transition-colors truncate font-light"
                >
                  Pricing
                </Link>
                <Link
                  href="/contact"
                  className="block text-sm text-muted-foreground hover:text-[#4CD787] hover:bg-white/5 rounded-md transition-colors truncate font-light"
                >
                  Contact
                </Link>
                <Link
                  href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative"
                  className="block text-sm text-muted-foreground hover:text-[#4CD787] hover:bg-white/5 rounded-md transition-colors truncate font-light"
                >
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
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:items-center gap-4 lg:gap-8 text-sm text-muted-foreground">
                <a
                  href="tel:+14425440591"
                  className="flex items-center justify-center sm:justify-start gap-2 hover:text-[#4CD787] transition-colors"
                  aria-label="Call DevX Group at +1 (442) 544-0591"
                >
                  <svg
                    className="w-4 h-4 text-muted-foreground"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.1007 13.359L15.5719 12.8272H15.5719L16.1007 13.359ZM16.5562 12.9062L17.085 13.438H17.085L16.5562 12.9062ZM18.9728 12.5894L18.6146 13.2483L18.9728 12.5894ZM20.8833 13.628L20.5251 14.2869L20.8833 13.628ZM21.4217 16.883L21.9505 17.4148L21.4217 16.883ZM20.0011 18.2954L19.4723 17.7636L20.0011 18.2954ZM18.6763 18.9651L18.7459 19.7119H18.7459L18.6763 18.9651ZM8.81536 14.7266L9.34418 14.1947L8.81536 14.7266ZM4.00289 5.74561L3.2541 5.78816L3.2541 5.78816L4.00289 5.74561ZM10.4775 7.19738L11.0063 7.72922H11.0063L10.4775 7.19738ZM10.6342 4.54348L11.2346 4.09401L10.6342 4.54348ZM9.37326 2.85908L8.77286 3.30855V3.30855L9.37326 2.85908ZM6.26145 2.57483L6.79027 3.10667H6.79027L6.26145 2.57483ZM4.69185 4.13552L4.16303 3.60368H4.16303L4.69185 4.13552ZM12.0631 11.4972L12.5919 10.9654L12.0631 11.4972ZM16.6295 13.8909L17.085 13.438L16.0273 12.3743L15.5719 12.8272L16.6295 13.8909ZM18.6146 13.2483L20.5251 14.2869L21.2415 12.9691L19.331 11.9305L18.6146 13.2483ZM20.8929 16.3511L19.4723 17.7636L20.5299 18.8273L21.9505 17.4148L20.8929 16.3511ZM18.6067 18.2184C17.1568 18.3535 13.4056 18.2331 9.34418 14.1947L8.28654 15.2584C12.7186 19.6653 16.9369 19.8805 18.7459 19.7119L18.6067 18.2184ZM9.34418 14.1947C5.4728 10.3453 4.83151 7.10765 4.75168 5.70305L3.2541 5.78816C3.35456 7.55599 4.14863 11.144 8.28654 15.2584L9.34418 14.1947ZM10.7195 8.01441L11.0063 7.72922L9.9487 6.66555L9.66189 6.95073L10.7195 8.01441ZM11.2346 4.09401L9.97365 2.40961L8.77286 3.30855L10.0338 4.99296L11.2346 4.09401ZM5.73263 2.04299L4.16303 3.60368L5.22067 4.66736L6.79027 3.10667L5.73263 2.04299ZM10.1907 7.48257C9.66189 6.95073 9.66117 6.95144 9.66045 6.95216C9.66021 6.9524 9.65949 6.95313 9.659 6.95362C9.65802 6.95461 9.65702 6.95561 9.65601 6.95664C9.65398 6.95871 9.65188 6.96086 9.64972 6.9631C9.64539 6.96759 9.64081 6.97245 9.63599 6.97769C9.62634 6.98816 9.61575 7.00014 9.60441 7.01367C9.58174 7.04072 9.55605 7.07403 9.52905 7.11388C9.47492 7.19377 9.41594 7.2994 9.36589 7.43224C9.26376 7.70329 9.20901 8.0606 9.27765 8.50305C9.41189 9.36833 10.0078 10.5113 11.5343 12.0291L12.5919 10.9654C11.1634 9.54499 10.8231 8.68059 10.7599 8.27309C10.7298 8.07916 10.761 7.98371 10.7696 7.96111C10.7748 7.94713 10.7773 7.9457 10.7709 7.95525C10.7677 7.95992 10.7624 7.96723 10.7541 7.97708C10.75 7.98201 10.7451 7.98759 10.7394 7.99381C10.7365 7.99692 10.7335 8.00019 10.7301 8.00362C10.7285 8.00534 10.7268 8.00709 10.725 8.00889C10.7241 8.00979 10.7232 8.0107 10.7223 8.01162C10.7219 8.01208 10.7212 8.01278 10.7209 8.01301C10.7202 8.01371 10.7195 8.01441 10.1907 7.48257ZM11.5343 12.0291C13.0613 13.5474 14.2096 14.1383 15.0763 14.2713C15.5192 14.3392 15.8763 14.285 16.1472 14.1841C16.28 14.1346 16.3858 14.0763 16.4658 14.0227C16.5058 13.9959 16.5392 13.9704 16.5663 13.9479C16.5799 13.9367 16.5919 13.9262 16.6024 13.9166C16.6077 13.9118 16.6126 13.9073 16.6171 13.903C16.6194 13.9008 16.6215 13.8987 16.6236 13.8967C16.6246 13.8957 16.6256 13.8947 16.6266 13.8937C16.6271 13.8932 16.6279 13.8925 16.6281 13.8923C16.6288 13.8916 16.6295 13.8909 16.1007 13.359C15.5719 12.8272 15.5726 12.8265 15.5733 12.8258C15.5735 12.8256 15.5742 12.8249 15.5747 12.8244C15.5756 12.8235 15.5765 12.8226 15.5774 12.8217C15.5793 12.82 15.581 12.8183 15.5827 12.8166C15.5862 12.8133 15.5895 12.8103 15.5926 12.8074C15.5988 12.8018 15.6044 12.7969 15.6094 12.7929C15.6192 12.7847 15.6265 12.7795 15.631 12.7764C15.6403 12.7702 15.6384 12.773 15.6236 12.7785C15.5991 12.7876 15.501 12.8189 15.3038 12.7886C14.8905 12.7253 14.02 12.3853 12.5919 10.9654L11.5343 12.0291ZM9.97365 2.40961C8.95434 1.04802 6.94996 0.83257 5.73263 2.04299L6.79027 3.10667C7.32195 2.578 8.26623 2.63181 8.77286 3.30855L9.97365 2.40961ZM4.75168 5.70305C4.73201 5.35694 4.89075 4.9954 5.22067 4.66736L4.16303 3.60368C3.62571 4.13795 3.20329 4.89425 3.2541 5.78816L4.75168 5.70305ZM19.4723 17.7636C19.1975 18.0369 18.9029 18.1908 18.6067 18.2184L18.7459 19.7119C19.4805 19.6434 20.0824 19.2723 20.5299 18.8273L19.4723 17.7636ZM11.0063 7.72922C11.9908 6.7503 12.064 5.2019 11.2346 4.09401L10.0338 4.99295C10.4373 5.53193 10.3773 6.23938 9.9487 6.66555L11.0063 7.72922ZM20.5251 14.2869C21.3429 14.7315 21.4703 15.7769 20.8929 16.3511L21.9505 17.4148C23.2908 16.0821 22.8775 13.8584 21.2415 12.9691L20.5251 14.2869ZM17.085 13.438C17.469 13.0562 18.0871 12.9616 18.6146 13.2483L19.331 11.9305C18.2474 11.3414 16.9026 11.5041 16.0273 12.3743L17.085 13.438Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="truncate">+1 (442) 544-0591</span>
                </a>
                <a
                  href="mailto:support@devxgroup.io"
                  className="flex items-center justify-center sm:justify-start gap-2 hover:text-[#4CD787] transition-colors"
                  aria-label="Email DevX Group at support@devxgroup.io"
                >
                  <svg
                    className="w-4 h-4 text-muted-foreground"
                    viewBox="0 0 1920 1920"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 1694.235h1920V226H0v1468.235ZM112.941 376.664V338.94H1807.06v37.723L960 1111.233l-847.059-734.57ZM1807.06 526.198v950.513l-351.134-438.89-88.32 70.475 378.353 472.998H174.042l378.353-472.998-88.32-70.475-351.134 438.89V526.198L960 1260.768l847.059-734.57Z"
                      fillRule="evenodd"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="truncate">support@devxgroup.io</span>
                </a>
                <span className="flex items-center justify-center sm:justify-start sm:col-span-2 md:col-span-1 gap-2">
                  <svg
                    className="w-4 h-4 text-muted-foreground"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.2848 18.9935C12.1567 19.0875 12.0373 19.1728 11.9282 19.2493C11.8118 19.1721 11.6827 19.0833 11.5427 18.9832C10.8826 18.5109 10.0265 17.8176 9.18338 16.9529C7.45402 15.1792 6 12.9151 6 10.5C6 7.18629 8.68629 4.5 12 4.5C15.3137 4.5 18 7.18629 18 10.5C18 12.8892 16.4819 15.1468 14.6893 16.9393C13.8196 17.8091 12.9444 18.5099 12.2848 18.9935ZM19.5 10.5C19.5 16.5 12 21 12 21C11.625 21 4.5 16.5 4.5 10.5C4.5 6.35786 7.85786 3 12 3C16.1421 3 19.5 6.35786 19.5 10.5ZM13.5 10.5C13.5 11.3284 12.8284 12 12 12C11.1716 12 10.5 11.3284 10.5 10.5C10.5 9.67157 11.1716 9 12 9C12.8284 9 13.5 9.67157 13.5 10.5ZM15 10.5C15 12.1569 13.6569 13.5 12 13.5C10.3431 13.5 9 12.1569 9 10.5C9 8.84315 10.3431 7.5 12 7.5C13.6569 7.5 15 8.84315 15 10.5Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="truncate">San Diego, California</span>
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 text-sm border-t sm:border-t-0 pt-6 sm:pt-0 justify-center lg:justify-end lg:text-right">
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-[#4CD787] transition-colors text-center lg:text-left"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-[#4CD787] transition-colors text-center lg:text-left"
                >
                  Terms of Service
                </Link>
                <a
                  href="/sitemap.xml"
                  className="text-muted-foreground hover:text-[#4CD787] transition-colors text-center lg:text-left"
                  rel="noreferrer"
                >
                  Sitemap
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 lg:mt-10 border-t border-border pt-4 flex justify-center items-center">
            <p className="text-xs text-muted-foreground text-center">
              © {new Date().getFullYear()} DevX Group LLC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
