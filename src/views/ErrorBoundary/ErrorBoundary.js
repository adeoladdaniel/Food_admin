/*eslint-disable*/
import React from 'react';
import { Typography, Button } from '@material-ui/core';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo
    });
    console.log(
      error,
      errorInfo
    );
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <>
          <Typography variant="body1" align="center">
            {' '}
            <img
              height="100"
              src="https://res.cloudinary.com/accelerar/image/upload/v1601208600/FrontendAssests/Carousels/error_wkfial.svg"
              alt="foodcrowdy"
            />
          </Typography>
          <div className="error">
            <div>
              <h1>Something Went Wrong </h1>
              <p>Please refresh the page</p>
              <p>
                <a href="/">
                  <Button
                    style={{
                      background: '#ffcc2a',
                      color: '#000'
                    }}
                    variant="contained"
                    color="primary"
                  >
                    GO To Home Page
                  </Button>
                </a>
              </p>
            </div>
          </div>
        </>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
