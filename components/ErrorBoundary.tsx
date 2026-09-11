import React, { Component, ErrorInfo } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error; // Store the error object
  errorInfo?: ErrorInfo; // Store error information
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state to indicate an error occurred
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service if needed
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Store the error info in the state
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI with error information
      return (
        <div>
          <h1>Something went wrong.</h1>
          {this.state.error && <p>Error: {this.state.error.message}</p>}
          {this.state.errorInfo && (
            <pre>
              {this.state.errorInfo.componentStack}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
