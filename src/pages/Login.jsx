import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    userName: '',
    isLoginButtonDisabled: true,
    isLoading: false,
    dataReceveid: false,
  };

  onUserInputChange = ({ target }) => {
    const { name, value } = target;
    const minUserName = 3;

    this.setState({
      [name]: value,
      isLoginButtonDisabled: value.length < minUserName,
    });
  }

  loginBtn = async () => {
    this.setState({ isLoading: true });
    const { userName } = this.state;
    const savedUser = await createUser({ name: userName });
    if (savedUser) this.setState({ isLoading: false, dataReceveid: true });
  }

  render() {
    const { userName, isLoginButtonDisabled, isLoading, dataReceveid } = this.state;
    return (
      <div data-testid="page-login">
        { isLoading && <Loading /> }
        { dataReceveid && <Redirect to="/search" /> }
        <form>
          <label htmlFor="userName">
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="Digite o seu nome..."
              data-testid="login-name-input"
              value={ userName }
              onChange={ this.onUserInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isLoginButtonDisabled }
            onClick={ this.loginBtn }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
