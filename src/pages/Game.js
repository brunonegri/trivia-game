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
    const { token, history } = this.props;
    const tokenValid = 64;
    if (token.length < tokenValid) {
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

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
