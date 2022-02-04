import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <nav>
          <ul>
            <li><Link to="/search" data-testid="link-to-search">Search</Link></li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
            </li>
            <li><Link to="/profile" data-testid="link-to-profile">Profile</Link></li>
          </ul>
        </nav>
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
