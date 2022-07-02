import React from 'react';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="feedback-text">
          <Header />
          Feedback
        </h1>
      </div>
    );
  }
}

export default Feedback;
