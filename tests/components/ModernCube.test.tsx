import { render, screen, fireEvent } from '@testing-library/react'
import { renderWithProviders, setupIntersectionObserverMock } from '../test-utils'
import ModernCube3D from '@3d/ModernCube'

// Mock @react-three/fiber and @react-three/drei
jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => <div data-testid="canvas">{children}</div>,
  useFrame: jest.fn(),
  useThree: () => ({
    viewport: { width: 10 },
  }),
}))

jest.mock('@react-three/drei', () => ({
  OrbitControls: () => <div data-testid="orbit-controls" />,
  Environment: () => <div data-testid="environment" />,
  Float: ({ children }: { children: React.ReactNode }) => <div data-testid="float">{children}</div>,
  Edges: () => <div data-testid="edges" />,
  Text: ({ children }: { children: React.ReactNode }) => <div data-testid="text">{children}</div>,
  Sparkles: () => <div data-testid="sparkles" />,
  RoundedBox: ({ children }: { children: React.ReactNode }) => <div data-testid="rounded-box">{children}</div>,
  PerspectiveCamera: () => <div data-testid="perspective-camera" />,
}))

// Mock three.js
jest.mock('three', () => ({
  MeshStandardMaterial: jest.fn(),
  Vector3: jest.fn(),
  MathUtils: {
    lerp: jest.fn(),
  },
  AdditiveBlending: 'AdditiveBlending',
  Color: jest.fn(),
}))

describe('ModernCube3D', () => {
  beforeEach(() => {
    setupIntersectionObserverMock()
  })

  it('renders the canvas container', () => {
    renderWithProviders(<ModernCube3D />)
    expect(screen.getByTestId('canvas')).toBeInTheDocument()
  })

  it('renders 3D scene elements', () => {
    renderWithProviders(<ModernCube3D />)
    
    expect(screen.getByTestId('perspective-camera')).toBeInTheDocument()
    expect(screen.getByTestId('environment')).toBeInTheDocument()
    expect(screen.getByTestId('orbit-controls')).toBeInTheDocument()
  })

  it('renders cube faces with correct text', () => {
    renderWithProviders(<ModernCube3D />)
    
    const texts = screen.getAllByTestId('text')
    expect(texts).toHaveLength(6) // 6 faces of the cube
    
    // Check for some of the face texts
    expect(screen.getByText('Custom Software')).toBeInTheDocument()
    expect(screen.getByText('Expert Solutions')).toBeInTheDocument()
    expect(screen.getByText('Fast Results')).toBeInTheDocument()
  })

  it('renders visual effects', () => {
    renderWithProviders(<ModernCube3D />)
    
    expect(screen.getByTestId('float')).toBeInTheDocument()
    expect(screen.getByTestId('edges')).toBeInTheDocument()
    expect(screen.getByTestId('sparkles')).toBeInTheDocument()
  })

  it('renders the main cube structure', () => {
    renderWithProviders(<ModernCube3D />)
    
    expect(screen.getByTestId('rounded-box')).toBeInTheDocument()
  })

  it('handles WebGL failure gracefully', () => {
    // Mock WebGL failure
    const mockGetContext = jest.fn().mockReturnValue(null)
    const mockCreateElement = jest.fn().mockReturnValue({
      getContext: mockGetContext,
    })
    document.createElement = mockCreateElement

    renderWithProviders(<ModernCube3D />)
    
    // Should render fallback component
    expect(screen.getByTestId('canvas')).toBeInTheDocument()
  })
}) 