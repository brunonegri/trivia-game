import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import userLogin from '../redux/actions';

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
      const { dispatchLogin } = this.props;
      fetch('https://opentdb.com/api_token.php?command=request')
        .then((response) => response.json())
        .then(({ token }) => {
          localStorage.setItem('token', token);
        });
      dispatchLogin(this.state);
      const { history } = this.props;
      history.push('/game');
    }

    render() {
      const {
        name,
        email,
      } = this.state;

      const validate = (name.length >= 1 && email.length >= 1);

      return (
        <div>
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              name="name"
              data-testid="input-player-name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>

          <br />
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>

          <button
            type="submit"
            data-testid="btn-play"
            disabled={ !validate }
            onClick={ this.handleClick }
          >
            Play
          </button>

          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
        </div>
      );
    }
}

Login.propTypes = {
  dispatchLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (dados) => dispatch(userLogin(dados)),
});

export default connect(null, mapDispatchToProps)(Login);
