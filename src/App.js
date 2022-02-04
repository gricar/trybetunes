import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Loading from './pages/Loading';
import { createUser } from './services/userAPI';

class App extends React.Component {
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
    const response = await createUser({ name: userName });
    if (response) {
      this.setState({
        isLoading: false,
        dataReceveid: true,
      });
    }
  }

  render() {
    const { userName, isLoginButtonDisabled, isLoading, dataReceveid } = this.state;
    const props = { userName, isLoginButtonDisabled };

    if (isLoading) return <Loading />;
    return (
      <BrowserRouter>
        <Switch>
          { dataReceveid ? <Redirect to="/search" /> : null }
          <Route
            exact
            path="/"
            render={ () => (
              <Login
                { ...props }
                onUserInputChange={ this.onUserInputChange }
                isLoading={ this.loginBtn }
              />
            ) }
          />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
