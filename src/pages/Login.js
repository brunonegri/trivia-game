import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogin, getToken } from '../redux/actions';

class Login extends React.Component {
    state = {
      name: '',
      asserions: 0,
      score: 0,
      gravatarEmail: '',
    };

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({ [name]: value });
    }

    handleClick = async () => {
      // console.log('ants');
      const { dispatchLogin, dispatchToken } = this.props;
      await dispatchToken();
      dispatchLogin(this.state);
      const { history } = this.props;
      history.push('/game');
      // console.log('depois');
    }

    validEmailAndPassword= () => {
      const { gravatarEmail, name } = this.state;

      const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const verify = regexEmail.test(gravatarEmail);

      const minCharacters = 1;
      return !(verify && name.length >= minCharacters);
    }

    render() {
      const {
        name,
        gravatarEmail,
      } = this.state;

      return (
        <div className="main-login">
          <div className="login-container">
            <label htmlFor="name">
              Nome:
              <input
                type="text"
                name="name"
                data-testid="input-player-name"
                value={ name }
                onChange={ this.handleChange }
                placeholder="Digite seu Nome"
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                name="gravatarEmail"
                data-testid="input-gravatar-email"
                value={ gravatarEmail }
                onChange={ this.handleChange }
                placeholder="Digite seu email"
              />
            </label>
            <div>
              <button
                type="submit"
                data-testid="btn-play"
                disabled={ this.validEmailAndPassword() }
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
          </div>
        </div>
      );
    }
}

Login.propTypes = {
  dispatchLogin: PropTypes.func.isRequired,
  dispatchToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchToken: async () => dispatch(getToken()),
  dispatchLogin: (dados) => dispatch(userLogin(dados)),
});

export default connect(null, mapDispatchToProps)(Login);
