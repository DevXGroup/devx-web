import { Metadata } from 'next'
import PricingPage from "./PricingPage"

export const metadata: Metadata = {
  title: 'Software Development Pricing | Custom Solutions & Enterprise Packages | DevX Group',
  description: 'Transparent pricing for professional software development services. Choose from Rapid MVP, Growth Accelerator, or Enterprise packages. Custom quotes available for complex projects.',
}

export default function Pricing() {
  return <PricingPage />
}
