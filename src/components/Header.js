import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;
    const user = md5(email).toString();
    return (
      <header className="header-container">
        <img src={ `https://www.gravatar.com/avatar/${user}` } alt="avatar" data-testid="header-profile-picture" />
        <div>
          <p className="user-name" data-testid="header-player-name">{name}</p>
          <p>
            SCORE:
            <span className="score" data-testid="header-score">{score}</span>

          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
