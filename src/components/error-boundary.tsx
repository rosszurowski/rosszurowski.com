"use client"

import React, { Component, ErrorInfo, isValidElement } from "react"

type Props = {
  children: React.ReactNode
  fallback?: React.ReactNode | ((props: FallbackProps) => React.ReactNode)
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

type State = {
  error?: Error
}

export type FallbackProps = {
  error?: Error
  resetError: () => void
}

/**
 * ErrorBoundary is a generic component for handling fallback states for errors
 * during renders.
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      error: undefined,
    }
  }

  static getDerivedStateFromError(err: Error) {
    return { error: err }
  }

  componentDidCatch(err: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught Error", err, errorInfo)
    this.props.onError?.(err, errorInfo)
  }

  render() {
    if (this.state.error !== undefined) {
      if (typeof this.props.fallback === "function") {
        return this.props.fallback({
          error: this.state.error,
          resetError: () => this.setState({ error: undefined }),
        })
      }
      if (isValidElement(this.props.fallback)) {
        return this.props.fallback
      }
      if (this.props.fallback === null) {
        // If the fallback is null, we don't render anything
        return null
      }
      throw new Error("Missing fallback element")
    }
    return this.props.children
  }
}
