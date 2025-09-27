import { Metadata } from 'next'
import ContactPage from "./ContactPage"

export const metadata: Metadata = {
  title: 'Contact DevX Group | Get a Free Software Development Consultation',
  description: 'Contact DevX Group for your software development needs. Schedule a free consultation, get a custom quote, or discuss your project requirements. Phone: +1 (442) 544-0591',
}

export default function Contact() {
  return <ContactPage />
}
