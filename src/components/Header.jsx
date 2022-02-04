import React, { Component } from 'react';
import { getUser } from '../services/userAPI';

class Header extends Component {
  getUserName = async () => {
    const responseName = await getUser();
    console.log(responseName);
  }

  render() {
    return (
      <header data-testid="header-component">
        <h3>Header Page</h3>
        <p data-testid="header-user-name">{ this.getUserName }</p>
      </header>
    );
  }
}

export default Header;
