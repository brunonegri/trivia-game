import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { questionApi } from '../services/Api';
import Next from './Next';
import Question from './Question';

class GameBoard extends React.Component {
    state = {
      questions: [],
      index: 0,
      isAnswered: false,
      setTimer: 30,
      ifFinish: false,
      assertions: 0,
    }

    async componentDidMount() {
      const localToken = localStorage.getItem('token');
      const fetchQuestions = await questionApi(localToken);
      const { results } = fetchQuestions;
      const shuffledQuestions = results.map(this.shuffleAnswers);
      this.setState((prevState) => ({
        ...prevState,
        questions: [...shuffledQuestions],
      }));
      // this.setDifficulty();
      this.timeOut();
    }

    componentWillUnmount() {
      const { interval } = this.state;
      this.timeIsOver(interval);
    }

    shuffleAnswers = (respostas) => {
      const mN = 0.5;
      const shuffledAnswers = [...respostas?.incorrect_answers, respostas?.correct_answer]
        .sort(() => mN - Math.random());
      return ({
        ...respostas,
        shuffledAnswers,
      });
    }

    timeOut= () => {
      const { setTimer } = this.state;
      const umSegundo = 1000;
      const interval = setInterval(() => {
        if (setTimer === 0) {
          this.timeIsOver(interval);
        } else {
          this.setState((prevState) => ({
            ...prevState,
            setTimer: prevState.setTimer - 1,
            interval,
          }));
        }
      }, umSegundo);
    }

    timeIsOver=(interval) => {
      clearInterval(interval);
    }

    handleClickAnswers = () => {
      this.setState({ isDisabled: false, isAnswered: true });
    }

    handleClick = () => {
      const { index } = this.state;
      const { history, name, email, score } = this.props;
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
        index: prev.index + 1,
        isAnswered: false,
        setTimer: 30,
      }));
    }

    render() {
      const { index, isDisabled, isAnswered, questions, setTimer } = this.state;
      console.log(questions);
      const validate = questions.length > 1;
      return (
        <div>
          <div className="gameBoard-container">
            <hr />
            <div className="timer-container">
              <img className="cronometro" src="https://cdn.icon-icons.com/icons2/785/PNG/512/stopwatch_icon-icons.com_64805.png" alt="timer" />
              <p className="timer">{setTimer}</p>
            </div>
            {validate
              && <Question
                question={ questions[index] }
                isAnswered={ isAnswered }
                isDisabled={ !setTimer || isAnswered }
                handleClickAnswers={ this.handleClickAnswers }
                setTimer={ setTimer }
              />}
            { !isDisabled
            && <Next handleClick={ this.handleClick } isDisabled={ !isAnswered } /> }
          </div>
        </div>);
    }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(GameBoard);

GameBoard.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
