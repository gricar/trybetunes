import React, { Component } from 'react';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    userLogged: '',
    isLoading: true,
  };

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    const { name } = await getUser();
    if (name) this.setState({ userLogged: name, isLoading: false });
  }

  render() {
    const { userLogged, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        <h3>Header Page</h3>
        {
          isLoading
            ? <Loading />
            : <p data-testid="header-user-name">{ `Olá, ${userLogged}!` }</p>
        }
      </header>
    );
  }
}

export default Header;
