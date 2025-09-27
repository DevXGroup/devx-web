import { Metadata } from 'next'
import ServicesPage from "./ServicesPage"

export const metadata: Metadata = {
  title: 'Software Development Services | Web Apps, Mobile Apps, AI & IoT Solutions',
  description: 'Comprehensive software development services including web applications, mobile apps, AI/ML solutions, IoT hardware integration, and digital transformation. Expert developers delivering scalable solutions.',
}

export default function Services() {
  return <ServicesPage />
}
