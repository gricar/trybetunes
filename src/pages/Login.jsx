import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    const { userName, isLoginButtonDisabled, onUserInputChange, isLoading } = this.props;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="userName">
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="Digite o seu nome..."
              data-testid="login-name-input"
              value={ userName }
              onChange={ onUserInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isLoginButtonDisabled }
            onClick={ isLoading }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;

const { string, func, bool } = PropTypes;

Login.propTypes = {
  userName: string.isRequired,
  isLoginButtonDisabled: bool.isRequired,
  onUserInputChange: func.isRequired,
  isLoading: func.isRequired,
};
