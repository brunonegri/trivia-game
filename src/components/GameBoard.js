import React from 'react';
import { connect } from 'react-redux';
import { questionApi } from '../services/Api';
import Answers from './Answers';
import Next from './Next';
// import Questions from './Questions';
// import PropTypes from 'prop-types';

class GameBoard extends React.Component {
    state = {
      questions: [],
      index: 0,
      isDisabled: true,
      isAnswered: false,
      setTimer: 30,
    }

    async componentDidMount() {
      const localToken = localStorage.getItem('token');
      console.log(localToken);
      const fetchQuestions = await questionApi(localToken);
      this.setState({
        questions: fetchQuestions.results,
      });
      // this.getAnswers();
      const segundo = 1000;
      setInterval(() => this.timeOut(), segundo);
    }

    handleClickAnswers = () => {
      this.setState({ isDisabled: false, isAnswered: true });
    }

    handleClick = () => {
      const { index } = this.state;
      const acc = index;
      this.setState((prev) => ({
        ...prev, index: acc + 1,
      }));
      this.setState({ isDisabled: true, isAnswered: false });
      this.setState({ setTimer: 30 });
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
      const { questions, index, isAnswered } = this.state;
      const respostas = [];
      const correctAnswer = (<Answers
        isDisabled={ isAnswered }
        handleClickAswers={ this.handleClickAnswers }
        dataTestId="correct-answer"
        resposta={ questions[index].correct_answer }
        className={ isAnswered ? 'green-border' : 'not-answered' }
      />);
      respostas.push(correctAnswer);
      questions[index]
        .incorrect_answers.forEach((elemento, i) => respostas
          .push(<Answers
            isDisabled={ isAnswered }
            handleClickAswers={ this.handleClickAnswers }
            dataTestId={ `wrong-answer-${i}` }
            resposta={ elemento }
            className={ isAnswered ? 'red-border' : 'not-answered' }
          />));
      const mN = 0.5;
      const randon = () => (Math.round(Math.random()) - mN);
      return (respostas.sort(randon));
    }

    timeOut= () => {
      const { setTimer } = this.state;
      if (setTimer === 0) {
        this.handleClickAnswers();
      } else {
        this.setState({ setTimer: setTimer - 1 });
      }
    }

    // timeIsOver() {
    //   this.setState({ isDisabled: false, isAnswered: true });
    // }

    render() {
      const { index, questions, isDisabled, setTimer } = this.state;
      const validate = questions.length > 1;
      return (
        <div>
          <div>
            <p>{setTimer}</p>
            {validate && this.renderQuestions()[index]}
            { !isDisabled
            && <Next handleClick={ this.handleClick } isDisabled={ isDisabled } /> }
          </div>
        </div>);
    }
}

export default connect()(GameBoard);
