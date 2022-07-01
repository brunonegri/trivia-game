import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { questionApi } from '../services/Api';
import Answers from './Answers';
import { setScore } from '../redux/actions';

class GameBoard extends React.Component {
    state = {
      questions: [],
      index: 0,
      score: 0,
      timer: 30,
      difficulty: 0,
    }

    async componentDidMount() {
      const localToken = localStorage.getItem('token');
      /* console.log(localToken); */
      const fetchQuestions = await questionApi(localToken);
      this.setState({
        questions: fetchQuestions.results,
      }, () => this.setDifficulty());
      this.getAnswers();
    }

    handleClick = (event) => {
      const { index } = this.state;
      const acc = index;
      this.setScore(event);
      this.setState((prev) => ({
        ...prev, index: acc + 1,
      }), () => this.setDifficulty());
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
      /* console.log(questions[index].difficulty); */
      if (questions[index].difficulty === 'easy') {
        this.setState({ difficulty: 1 }, () => {
        });
      } else if (questions[index].difficulty === 'medium') {
        this.setState({ difficulty: 2 }, () => {
        });
      } else if (questions[index].difficulty === 'hard') {
        this.setState({ difficulty: 3 }, () => {
        });
      }
      /* console.log(questions); */
    }

    setScore = (event) => {
      const { innerText } = event.target;
      const { dispatchScore } = this.props;
      const { difficulty, timer, questions, index } = this.state;

      const numberCalculate = 10;

      const calculateScore = numberCalculate + (timer * difficulty);

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
      respostas.sort(randon);
      return respostas;
    }

    render() {
      const { index, questions } = this.state;
      const validate = questions.length > 1;
      return (
        <div>
          <div>
            {/* to aqui */}
            {validate && this.renderQuestions()[index] }
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
};
