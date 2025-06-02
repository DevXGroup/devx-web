import { render, screen, fireEvent } from '@testing-library/react'
import { renderWithProviders, setupIntersectionObserverMock } from '../test-utils'
import ParallaxTestimonials from '@/components/ParallaxTestimonials'

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

describe('ParallaxTestimonials', () => {
  beforeEach(() => {
    setupIntersectionObserverMock()
  })

  it('renders the component with title and description', () => {
    renderWithProviders(<ParallaxTestimonials />)
    
    expect(screen.getByText('What Our Clients Say')).toBeInTheDocument()
    expect(screen.getByText(/Don't just take our word for it/)).toBeInTheDocument()
  })

  it('renders all testimonial cards', () => {
    renderWithProviders(<ParallaxTestimonials />)
    
    // Check for all testimonial authors
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
    expect(screen.getByText('Michael Chen')).toBeInTheDocument()
    expect(screen.getByText('Emily Rodriguez')).toBeInTheDocument()
  })

  it('renders testimonial quotes', () => {
    renderWithProviders(<ParallaxTestimonials />)
    
    expect(screen.getByText(/DevX Group transformed our business/)).toBeInTheDocument()
    expect(screen.getByText(/Working with DevX Group has been a game-changer/)).toBeInTheDocument()
    expect(screen.getByText(/The mobile app DevX Group built for us/)).toBeInTheDocument()
  })

  it('renders company positions', () => {
    renderWithProviders(<ParallaxTestimonials />)
    
    expect(screen.getByText('CTO, TechVision Inc.')).toBeInTheDocument()
    expect(screen.getByText('CEO, Innovate Solutions')).toBeInTheDocument()
    expect(screen.getByText('Product Manager, MobileFirst')).toBeInTheDocument()
  })

  it('renders company logos', () => {
    renderWithProviders(<ParallaxTestimonials />)
    
    const logos = screen.getAllByAltText('Company logo')
    expect(logos).toHaveLength(3)
  })

  it('renders author images', () => {
    renderWithProviders(<ParallaxTestimonials />)
    
    expect(screen.getByAltText('Sarah Johnson')).toBeInTheDocument()
    expect(screen.getByAltText('Michael Chen')).toBeInTheDocument()
    expect(screen.getByAltText('Emily Rodriguez')).toBeInTheDocument()
  })
}) 