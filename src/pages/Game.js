import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import GameBoard from '../components/GameBoard';
// import { questionApi } from '../services/Api';

class Game extends React.Component {
  componentDidMount() {
    this.validateToken();
  }

  validateToken = () => {
    const { history } = this.props;
    const localToken = localStorage.getItem('token');
    console.log(localToken.length);
    const tokenValid = 64;
    if (localToken.length < tokenValid) {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  render() {
    return (
      <div>
        <Header />
        <GameBoard />
      </div>);
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Game);
