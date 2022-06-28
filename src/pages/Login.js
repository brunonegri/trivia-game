import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
    state = {
      name: '',
      email: '',
    };

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({ [name]: value });
    }

    handleClick = () => {
      fetch('https://opentdb.com/api_token.php?command=request')
        .then((response) => response.json())
        .then(({ token }) => {
          const { history } = this.props;
          localStorage.setItem('token', token);
          history.push('/games');
        });
    }

    render() {
      const {
        name,
        email,
      } = this.state;

      const validate = (name.length >= 1 && email.length >= 1);

      return (
        <div>
          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />

          <br />

          <input
            type="email"
            name="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />

          <button
            type="submit"
            data-testid="btn-play"
            disabled={ !validate }
            onClick={ this.handleClick }
          >
            Play
          </button>

        </div>
      );
    }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
