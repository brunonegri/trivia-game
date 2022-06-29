import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, name } = this.props;
    const user = md5(email).toString();
    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${user}` } alt="avatar" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{name}</p>
        <div data-testid="header-score">0</div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.loginReducer.player.gravatarEmail,
  name: state.loginReducer.player.name,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
