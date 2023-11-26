import { Component, ErrorInfo, ReactNode } from 'react';
import React from 'react';
import styles from './ErrorPage.module.scss';

interface ErrorProps {
  children?: ReactNode;
}

interface ErrorState {
  hasError: boolean;
  message: string;
}

class ErrorPage extends Component<ErrorProps, ErrorState> {
  state: ErrorState = {
    hasError: false,
    message: '',
  };

  static getDerivedStateFromError(error: Error): ErrorState {
    return {
      hasError: true,
      message: error.message,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className={styles.error_page}>
          <h1>Something went wrong, but we are working to fix the problem.</h1>
          <h2>{this.state.message}</h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorPage;
