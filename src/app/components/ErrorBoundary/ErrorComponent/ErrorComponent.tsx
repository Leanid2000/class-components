import { Component } from 'react';

class ErrorComponent extends Component {
  componentDidMount() {
    throw new Error('This is a test error.');
  }
  render() {
    return null;
  }
}

export default ErrorComponent;
