import { screen } from '@testing-library/react'
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
  const originalGetContext = HTMLCanvasElement.prototype.getContext

  beforeEach(() => {
    setupIntersectionObserverMock()
    HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({})
  })

  afterEach(() => {
    HTMLCanvasElement.prototype.getContext = originalGetContext
  })

  const renderCube = async () => {
    renderWithProviders(<ModernCube3D />)
    await screen.findByTestId('canvas')
  }

  it('renders the canvas container', async () => {
    await renderCube()
    expect(screen.getByTestId('canvas')).toBeInTheDocument()
  })

  it('renders interactive controls', async () => {
    await renderCube()
    expect(await screen.findByTestId('orbit-controls')).toBeInTheDocument()
  })

  it('renders cube faces with correct text', async () => {
    await renderCube()
    
    const texts = await screen.findAllByTestId('text')
    expect(texts).toHaveLength(6) // 6 faces of the cube
    
    // Check for some of the face texts
    expect(screen.getByText('Custom Software')).toBeInTheDocument()
    expect(screen.getByText('Expert Solutions')).toBeInTheDocument()
    expect(screen.getByText('Fast Results')).toBeInTheDocument()
  })

  it('renders visual effects', async () => {
    await renderCube()
    expect(await screen.findByTestId('float')).toBeInTheDocument()
    expect(await screen.findByTestId('edges')).toBeInTheDocument()
    expect(await screen.findByTestId('sparkles')).toBeInTheDocument()
  })

  it('renders the main cube structure', async () => {
    await renderCube()
    
    expect(await screen.findByTestId('rounded-box')).toBeInTheDocument()
  })

  it('handles WebGL failure gracefully', async () => {
    const originalGetContext = HTMLCanvasElement.prototype.getContext
    HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue(null)

    renderWithProviders(<ModernCube3D />)

    expect(await screen.findByText('Custom Software')).toBeInTheDocument()
    expect(screen.queryByTestId('canvas')).not.toBeInTheDocument()

    HTMLCanvasElement.prototype.getContext = originalGetContext
  })
})
