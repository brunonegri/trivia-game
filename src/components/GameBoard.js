import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { questionApi } from '../services/Api';
import Answers from './Answers';
import { setScore } from '../redux/actions';
import Next from './Next';
// import Questions from './Questions';
// import PropTypes from 'prop-types';

class GameBoard extends React.Component {
    state = {
      questions: [],
      index: 0,
      score: 0,
      difficulty: 0,
      isDisabled: true,
      isAnswered: false,
      setTimer: 30,
      count: 0,
      ifFinish: false,
    }

    async componentDidMount() {
      const localToken = localStorage.getItem('token');
      /* console.log(localToken); */
      const fetchQuestions = await questionApi(localToken);
      this.setState({
        questions: fetchQuestions.results,
      }, () => this.setDifficulty());
      const segundo = 1000;
      setInterval(() => this.timeOut(), segundo);
    }

    handleClickAnswers = (event) => {
      this.setState({ isDisabled: false, isAnswered: true });
      const { isAnswered } = this.state;
      if (!isAnswered) {
        this.setScore(event.target);
      }
    }

    handleClick = () => {
      const { index } = this.state;
      const acc = index;
      const maxIndex = 3;
      if (index > maxIndex) {
        const { history } = this.props;
        history.push('/feedback');
      }
      this.setState((prev) => ({
        ...prev, index: acc + 1,
      }), () => {
        this.setDifficulty();
      });
      this.setState({ isDisabled: true, isAnswered: false });
      this.setState({ setTimer: 30 });

      this.setState((prev) => ({
        count: prev.count + 1,
      }));
    }

    renderQuestions = () => {
      const { questions } = this.state;
      /* console.log(questions); */
      const arrayQ = questions.map((pergunta, index) => (
        <div key={ index }>
          <p>{`Dificuldade: ${pergunta.difficulty}`}</p>
          <p data-testid="question-category">{pergunta.category}</p>
          <p data-testid="question-text">{pergunta.question}</p>
          <div data-testid="answer-options">
            {this.getAnswers()}
          </div>
        </div>
      ));
      return arrayQ;
    }

    setDifficulty = () => {
      const { questions, index } = this.state;
      if (questions[index].difficulty === 'easy') {
        this.setState({ difficulty: 1 });
      } else if (questions[index].difficulty === 'medium') {
        this.setState({ difficulty: 2 });
      } else if (questions[index].difficulty === 'hard') {
        this.setState({ difficulty: 3 });
      }
    }

    setScore = (event) => {
      const { innerText } = event;
      const { dispatchScore } = this.props;
      const { difficulty, setTimer, questions, index } = this.state;

      const numberCalculate = 10;

      const calculateScore = numberCalculate + (setTimer * difficulty);

      const correctAnswer = questions[index].correct_answer;

      if (correctAnswer === innerText) {
        this.setState((prev) => ({
          ...prev, score: prev.score + calculateScore,
        }), () => {
          const { score } = this.state;
          dispatchScore(score);
        });
      }
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

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (infoScore) => dispatch(setScore(infoScore)),
});

export default connect(null, mapDispatchToProps)(GameBoard);

GameBoard.propTypes = {
  dispatchScore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
