import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    searchInput: '',
    isSearchButtonDisabled: true,
  };

  onSearchInputChange = ({ target }) => {
    const { name, value } = target;
    const minSearchInput = 2;

    this.setState({
      [name]: value,
      isSearchButtonDisabled: value.length < minSearchInput,
    });
  }

  render() {
    const { searchInput, isSearchButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="searchInput">
            <input
              type="text"
              id="searchInput"
              name="searchInput"
              placeholder="Pesquise por uma música ou banda"
              data-testid="search-artist-input"
              value={ searchInput }
              onChange={ this.onSearchInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isSearchButtonDisabled }
            // onClick={ this. }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
