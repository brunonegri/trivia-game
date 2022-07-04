import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  render() {
    const { difficulty, category, question, getAnswers, index } = this.props;
    return (
      <div key={ index }>
        <p>{`Dificuldade: ${difficulty}`}</p>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        <div data-testid="answer-options">
          {getAnswers}
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  index: PropTypes.number.isRequired,
  difficulty: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  getAnswers: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Question;
