import React from 'react';
import { connect } from 'react-redux';
import { questionApi } from '../services/Api';
import Answers from './Answers';
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
      this.getAnswers();
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
      console.log(questions);
      const arrayQ = questions.map((pergunta, index) => (
        <div key={ index }>
          <p data-testid="question-category">{pergunta.category}</p>
          <p data-testid="question-text">{pergunta.question}</p>
          <div data-testid="answer-options">
            {this.getAnswers()}
          </div>
        </div>
      ));
      return arrayQ;
    }

    getAnswers = () => {
      const { questions, index } = this.state;
      const respostas = [];
      const correctAnswer = (<Answers
        handleClick={ this.handleClick }
        dataTestId="correct-answer"
        resposta={ questions[index].correct_answer }
      />);
      respostas.push(correctAnswer);
      questions[index]
        .incorrect_answers.forEach((elemento, i) => respostas
          .push(<Answers
            handleClick={ this.handleClick }
            dataTestId={ `wrong-answer-${i}` }
            resposta={ elemento }
          />));
      const mN = 0.5;
      const randon = () => (Math.round(Math.random()) - mN);
      console.log(respostas.sort(randon));
      return respostas;
    }

    render() {
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
