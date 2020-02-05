import React from 'react';
import {ErrorImageOverlay, ErrorImageContainer, ErrorImageText} from './error-boundary.styles';

class ErrorBoundary extends React.Component {

  constructor(){
    super();
    this.state = {
      hasErrored: false
    }
  }

  static getDerivedStateFromError(error){
    return {hasErrored:true};
  }

  componentDidCatch(error, info){
    console.log(error);
  }

  render(){
    if (this.state.hasErrored){
      return (
        <ErrorImageContainer>
          <ErrorImageOverlay imageUrl='https://i.imgur.com/yW2W9SC.png' />
          <ErrorImageText>Sorry this page is broken</ErrorImageText>
        </ErrorImageContainer>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
