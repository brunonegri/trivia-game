import React from 'react';

class Login extends React.Component {
    state = {
      name: '',
      email: '',
    };

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({ [name]: value });
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
          >
            Play
          </button>

        </div>
      );
    }
}

export default Login;
