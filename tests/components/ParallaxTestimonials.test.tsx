import { screen, fireEvent } from '@testing-library/react'
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
    expect(screen.getByText('Chamrosh Inc Founder/CEO')).toBeInTheDocument()
    expect(screen.getByText('Lazurd Inc CEO')).toBeInTheDocument()
    expect(screen.getByText('Lawazm Inc CEO')).toBeInTheDocument()
  })

  it('renders testimonial quotes', () => {
    renderWithProviders(<ParallaxTestimonials />)

    expect(
      screen.getByText(/DevX Group has been assisting our company for the past three years/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Our partnership with Dev Group has driven our company/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/The DevX Group team showed high professionalism handling our project/i)
    ).toBeInTheDocument()
  })

  it('renders company positions', () => {
    renderWithProviders(<ParallaxTestimonials />)

    expect(screen.getByText('Founder/CEO, Chamrosh Inc')).toBeInTheDocument()
    expect(screen.getByText('CEO, Lazurd Inc')).toBeInTheDocument()
    expect(screen.getByText('CEO, Lawazm Inc')).toBeInTheDocument()
  })

  it('expands truncated testimonials when clicking Read more', () => {
    renderWithProviders(<ParallaxTestimonials />)

    const readMoreButton = screen.getAllByRole('button', { name: /read more/i })[0]
    fireEvent.click(readMoreButton)

    expect(
      screen.getByText(
        /We strongly recommend them to knowledgeable clients seeking a highly productive/i
      )
    ).toBeInTheDocument()
  })
})
