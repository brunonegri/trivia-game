import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { questionApi } from '../services/Api';
import Answers from './Answers';
import { setAnswers,
  setAssertions, setQuestions, setScore, setTimeout } from '../redux/actions';
import Next from './Next';
import Timer from './Timer';
import Question from './Question';

class GameBoard extends React.Component {
    state = {
      index: 0,
      score: 0,
      difficulty: 0,
      isDisabled: true,
      isAnswered: false,
      setTimer: 30,
      count: 0,
      ifFinish: false,
      assertions: 0,
    }

    componentDidMount() {
      
      this.setStateQuestions();
      // this.setDifficulty();
    }

    setStateQuestions= async () => {
      const { dispatchQuestions } = this.props;
      const localToken = localStorage.getItem('token');
      const fetchQuestions = await questionApi(localToken);
      dispatchQuestions(fetchQuestions.results);
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
      const { history, name, email, score, dispatchTimer } = this.props;
      const acc = index;
      const maxIndex = 3;
      if (index > maxIndex) {
        const user = md5(email).toString();
        const gravatarPic = `https://www.gravatar.com/avatar/${user}`;
        const ranking = JSON.parse(localStorage.getItem('ranking')) || [];

        const localObj = {
          name,
          score,
          picture: gravatarPic,
        };
        ranking.push(localObj);
        localStorage.setItem('ranking', JSON.stringify(ranking));
        history.push('/feedback');
      }
      this.setState((prev) => ({
        ...prev, index: acc + 1,
      }), () => {
        this.setDifficulty();
      });
      this.setState({ isDisabled: true, isAnswered: false });
      const n30 = 30;
      dispatchTimer(n30);

      this.setState((prev) => ({
        count: prev.count + 1,
      }));
    }

    // função retirada da thread do Jessy Damasceno no Slack
    decodeEntity=(inputStr) => {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = inputStr;
      return textarea.value;
    }

    renderQuestions = () => {
      const { questions } = this.props;
      /* console.log(questions); */
      const arrayQ = questions.map((pergunta, index) => (
        <div className="questions-container" key={ index }>
          <p className="category" data-testid="question-category">{pergunta.category}</p>
          <p
            className="question"
            data-testid="question-text"
          >
            {this.decodeEntity(pergunta.question)}

          </p>
          <div data-testid="answer-options">
            {this.getAnswers()}
          </div>
        </div>
      ));
      return arrayQ;
    }

    setDifficulty = () => {
      const { index } = this.state;
      const { questions } = this.props;
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
      const { dispatchScore, dispatchAssertions, questions } = this.props;
      const { difficulty, setTimer, index } = this.state;
      const numberCalculate = 10;

      const calculateScore = numberCalculate + (setTimer * difficulty);

      const correctAnswer = questions[index].correct_answer;

      if (correctAnswer === innerText) {
        this.setState((prev) => ({
          ...prev,
          score: prev.score + calculateScore,
          assertions: prev.assertions + 1,
        }), () => {
          const { score, assertions } = this.state;
          dispatchScore(score);
          dispatchAssertions(assertions);
        });
      }
    }

    getAnswers = () => {
      const { index, isAnswered } = this.state;
      const { questions, dispatchAnswers } = this.props;
      const correctAnswers = questions[index].correct_answer;
      const incorrectAnswers = questions[index].incorrect_answers;
      const answers = [...incorrectAnswers, correctAnswers];
      // console.log(answers);

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
      dispatchAnswers(answers);
      const mN = 0.5
      return (respostas.sort(() => mN - Math.random()));
    }

    render() {
      const { index, isDisabled, isAnswered } = this.state;
      const { questions } = this.props;
      const validate = questions.length > 1;
      return (
        <div>
          <div className="gameBoard-container">
            <hr />
            <div className="timer-container">
              <img className="cronometro" src="https://cdn.icon-icons.com/icons2/785/PNG/512/stopwatch_icon-icons.com_64805.png" alt="timer" />
              <Timer />
            </div>
            {/* {validate && questions.map((question, i) => (
              <Question
                handleClickAnswers={ this.handleClickAnswers }
                key={ i }
                isDisabled={ isAnswered }
                difficulty={ question.difficulty }
                category={ question.category }
                question={ question.question }
                getAnswers={ this.getAnswers() }
                index={ index }
              />
            ))[index]} */}
            {validate && this.renderQuestions()[index]}
            { !isDisabled
            && <Next handleClick={ this.handleClick } isDisabled={ isDisabled } /> }
          </div>
        </div>);
    }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (infoScore) => dispatch(setScore(infoScore)),
  dispatchAssertions: (assertions) => dispatch(setAssertions(assertions)),
  dispatchQuestions: (questions) => dispatch(setQuestions(questions)),
  dispatchAnswers: (answers) => dispatch(setAnswers(answers)),
  dispatchTimer: (timer) => dispatch(setTimeout(timer)),
});

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
  questions: state.gameReducer.questions,
  setTimer: state.gameReducer.timer,
});

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);

GameBoard.propTypes = {
  // setTimer: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  dispatchTimer: PropTypes.func.isRequired,
  dispatchScore: PropTypes.func.isRequired,
  dispatchAssertions: PropTypes.func.isRequired,
  dispatchQuestions: PropTypes.func.isRequired,
  dispatchAnswers: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
