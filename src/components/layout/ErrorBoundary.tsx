'use client'

import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  eventId?: string
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)

    // In production, you might want to log this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Log to error reporting service here
      console.error('Production error:', {
        error: error.toString(),
        errorInfo,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      })
    }
  }

  private resetError = () => {
    this.setState({ hasError: false, eventId: '' })
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="max-w-md mx-auto p-8 bg-red-500/10 border border-red-500/30 rounded-lg text-center">
              <h1 className="text-2xl font-bold mb-4 text-red-400">Oops! Something went wrong</h1>
              <p className="text-gray-300 mb-6">
                We&apos;re sorry, but something unexpected happened. Our team has been notified.
              </p>
              <div className="space-y-3">
                <button
                  onClick={this.resetError}
                  className="w-full px-4 py-2 bg-theme-green text-black rounded-lg hover:bg-theme-green/90 transition-colors font-medium"
                >
                  Try Again
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Refresh Page
                </button>
              </div>
              {this.state.eventId && (
                <p className="text-xs text-gray-500 mt-4">Error ID: {this.state.eventId}</p>
              )}
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
