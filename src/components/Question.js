import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAssertions, setScore } from '../redux/actions';

class Question extends React.Component {
  decodeEntity=(inputStr) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = inputStr;
    return textarea.value;
  }

  setScore = (answer, question) => {
    const { setTimer, assertions, score, dispatchScore, dispatchAssertions } = this.props;
    const numberCalculate = 10;
    const difficultyPoints = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    if (answer === question.correct_answer) {
      const calculateScore = numberCalculate
       + (setTimer * difficultyPoints[question.difficulty]);
      const newScore = score + calculateScore;
      const newAssertions = assertions + 1;
      dispatchScore(newScore);
      dispatchAssertions(newAssertions);
    }
  }

  checkAnswer = (answered, question, answer) => {
    if (!answered) {
      return '';
    }
    if (answered && question.includes(answer)) {
      return 'red-border';
    }
    return 'green-border';
  }

  render() {
    const { question, handleClickAnswers, isAnswered, isDisabled } = this.props;
    const answers = question.shuffledAnswers;
    return (
      <div className="questions-container">
        <p className="category" data-testid="question-category">{question.category}</p>
        <p
          className="question"
          data-testid="question-text"
        >
          {this.decodeEntity(question.question)}
        </p>
        <div data-testid="answer-options">
          {answers.map((answer, index) => (
            <button
              type="button"
              key={ index }
              disabled={ isDisabled }
              data-testid={ question.incorrect_answers.includes(answer)
                ? `wrong-answer-${index}` : 'correct_answer' }
              className={
                this.checkAnswer(isAnswered, question.incorrect_answers, answer)
              }
              onClick={ () => handleClickAnswers(this.setScore(answer, question)) }
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  setTimer: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  handleClickAnswers: PropTypes.func.isRequired,
  question: PropTypes.objectOf(PropTypes.any).isRequired,
  isAnswered: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  dispatchScore: PropTypes.func.isRequired,
  dispatchAssertions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (infoScore) => dispatch(setScore(infoScore)),
  dispatchAssertions: (assertions) => dispatch(setAssertions(assertions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
