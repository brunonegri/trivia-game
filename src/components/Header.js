import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const user = md5(emailDoUsuário).toString();
    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${user}` } alt="avatar" data-testid="header-profile-picture" />
        <p data-testid="header-player-name"></p>
        <div data-testid="header-score"></div>
      </header>
    );
  }
}

export default Header;
