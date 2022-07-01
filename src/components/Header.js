import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;
    const user = md5(email).toString();
    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${user}` } alt="avatar" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{name}</p>
        <div data-testid="header-score">{score}</div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.loginReducer.player.gravatarEmail,
  name: state.loginReducer.player.name,
  score: state.loginReducer.player.score,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
