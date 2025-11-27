/**
 * Error Logging Utility
 * Provides centralized error logging functionality
 * Can be extended to send errors to external services (Sentry, LogRocket, etc.)
 */

interface LogContext {
  component?: string;
  action?: string;
  userId?: string;
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = import.meta.env.DEV;

  /**
   * Log an error with context
   */
  error(error: Error | string, context?: LogContext) {
    const errorMessage = error instanceof Error ? error.message : error;
    const errorStack = error instanceof Error ? error.stack : undefined;

    // Console logging
    if (this.isDevelopment) {
      console.error('🔴 Error:', errorMessage);
      if (context) {
        console.error('Context:', context);
      }
      if (errorStack) {
        console.error('Stack:', errorStack);
      }
    }

    // Here you can add integration with error tracking services
    // Example: Sentry.captureException(error, { contexts: { custom: context } });
    // Example: LogRocket.captureException(error, { tags: context });

    // Log to your own backend
    this.sendToBackend('error', {
      message: errorMessage,
      stack: errorStack,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    });
  }

  /**
   * Log a warning
   */
  warn(message: string, context?: LogContext) {
    if (this.isDevelopment) {
      console.warn('⚠️ Warning:', message, context);
    }

    this.sendToBackend('warn', {
      message,
      context,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Log general info (use sparingly in production)
   */
  info(message: string, context?: LogContext) {
    if (this.isDevelopment) {
      console.log('ℹ️ Info:', message, context);
    }
  }

  /**
   * Log debug information (only in development)
   */
  debug(message: string, data?: unknown) {
    if (this.isDevelopment) {
      console.log('🐛 Debug:', message, data);
    }
  }

  /**
   * Send log to backend
   * Only sends in production, logs to console in development
   */
  private async sendToBackend(level: 'error' | 'warn' | 'info', data: unknown) {
    // Skip in development
    if (this.isDevelopment) {
      return;
    }

    try {
      // You can implement your own backend endpoint
      await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          level,
          ...(typeof data === 'object' && data !== null ? data : { data }),
        }),
      });
    } catch (error) {
      // Don't log errors from logging to avoid infinite loops
      console.error('Failed to send log to backend:', error);
    }
  }
}

// Export singleton instance
export const logger = new Logger();

// Export for use in error boundaries
export const logError = (error: Error, errorInfo?: { componentStack?: string }) => {
  logger.error(error, {
    component: errorInfo?.componentStack || undefined,
    type: 'react-error-boundary',
  });
};