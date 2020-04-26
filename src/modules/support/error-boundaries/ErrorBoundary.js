import React from 'react';

export default class ErrorBoundary extends React.Component {

  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null, hasError: false };
  }
  
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
      hasError: true
    })
  }
  
    render() {
      console.log('error  info= ',this.state.hasError)
      if (this.state.hasError) {
        // Error path
        return (
          <div>
            <h5>Something went wrong.</h5>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          </div>
        );
      } 
      return this.props.children;
    }
  }