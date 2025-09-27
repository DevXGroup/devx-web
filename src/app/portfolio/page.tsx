import { Metadata } from 'next'
import PortfolioPage from "./PortfolioPage"

export const metadata: Metadata = {
  title: 'Portfolio | Software Development Projects & Case Studies | DevX Group',
  description: 'Explore DevX Group\'s portfolio of successful software development projects including e-commerce platforms, mobile apps, AI solutions, and digital transformation case studies.',
}

export default function Portfolio() {
  return <PortfolioPage />
}
