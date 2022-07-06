import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Answers from './Answers';

class Question extends React.Component {
  render() {
    const { difficulty, category, question, getAnswers, handleClickAnswers, index, answers, isDisabled } = this.props;
    return (
      <div key={ index }>
        <p>{`Dificuldade: ${difficulty}`}</p>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        <div data-testid="answer-options">
          {getAnswers}
          {/* {answers.map((elemento) => (
            <Answers
              key={ index }
              isDisabled={ isDisabled }
              handleClickAswers={ handleClickAnswers }
              dataTestId={ `wrong-answer-${index}` }
              resposta={ elemento }
              className={ isDisabled ? 'red-border' : 'not-answered' }
            />
          ))} */}
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  difficulty: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  getAnswers: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  answers: state.gameReducer.answers,
});

export default connect(mapStateToProps)(Question);
