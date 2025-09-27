import { Metadata } from 'next'
import AboutPage from "./AboutPage"

export const metadata: Metadata = {
  title: 'About DevX Group | Elite Software Development Team | San Diego, California',
  description: 'Learn about DevX Group LLC - an elite software development team based in San Diego, California. Meet our experienced developers and discover our mission to build, launch, and scale innovative software solutions.',
}

export default function About() {
  return <AboutPage />
}
