import React from 'react';
import { connect } from 'react-redux';
import { questionApi } from '../services/Api';
// import PropTypes from 'prop-types';

class GameBoard extends React.Component {
    state = {
      questions: [],
      index: 0,
    }

    async componentDidMount() {
      const localToken = localStorage.getItem('token');
      console.log(localToken);
      const fetchQuestions = await questionApi(localToken);
      this.setState({
        questions: fetchQuestions.results,
      });
    }

    handleClick = () => {
      const { index } = this.state;
      const acc = index;
      this.setState((prev) => ({
        ...prev, index: acc + 1,
      }));
    }

    renderQuestions = () => {
      const { questions } = this.state;
      const arrayQ = questions.map((pergunta, index) => (
        <div key={ index }>
          <p data-testid="question-category">{pergunta.category}</p>
          <p data-testid="question-text">{pergunta.question}</p>
          <div data-testid="answer-options">
            <button
              onClick={ this.handleClick }
              data-testid={ `wrong-answer-${0}` }
              type="button"
            >
              {pergunta.incorrect_answers[0]}

            </button>
            <button
              onClick={ this.handleClick }
              data-testid="correct-answer"
              type="button"
            >
              {pergunta.correct_answer}

            </button>
            <button
              onClick={ this.handleClick }
              data-testid={ `wrong-answer-${2}` }
              type="button"
            >
              {pergunta.incorrect_answers[2]}

            </button>
            <button
              onClick={ this.handleClick }
              data-testid={ `wrong-answer-${1}` }
              type="button"
            >
              {pergunta.incorrect_answers[1]}

            </button>
          </div>
        </div>
      ));
      return arrayQ;
    }

    render() {
    //   console.log(questions);
      const { index, questions } = this.state;
      const validate = questions.length > 1;
      return (
        <div>
          <div>
            {/* to aqui */}
            {validate && this.renderQuestions()[index]}
          </div>
        </div>);
    }
}

export default connect()(GameBoard);
