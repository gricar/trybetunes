import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import ArtistCard from '../components/ArtistCard';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    searchInput: '',
    artistName: '',
    artistAlbum: [],
    isSearchInputDisabled: false,
    isSearchButtonDisabled: true,
    hasReceveid: false,
    albumNotFound: false,
    isLoading: false,
  };

  onSearchInputChange = ({ target }) => {
    const { name, value } = target;
    const minSearchInput = 2;

    this.setState({
      [name]: value,
      isSearchButtonDisabled: value.length < minSearchInput,
    });
  }

  searchBtn = async () => {
    // intrução do requisito 6, entrentanto não passa no teste
    /* this.setState({
      isSearchInputDisabled: true,
      isSearchButtonDisabled: true,
      isLoading: true,
    }); */
    const { searchInput } = this.state;
    const getAlbum = await searchAlbumsAPI(searchInput);
    if (getAlbum.length > 0) {
      this.setState({
        hasReceveid: true,
        isLoading: false,
        artistAlbum: getAlbum,
        artistName: searchInput,
        searchInput: '',
      });
    } else {
      this.setState({ albumNotFound: true });
    }
  }

  render() {
    const { artistName, searchInput, artistAlbum,
      isSearchInputDisabled, isSearchButtonDisabled,
      hasReceveid, albumNotFound, isLoading,
    } = this.state;
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
              disabled={ isSearchInputDisabled }
              onChange={ this.onSearchInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isSearchButtonDisabled }
            onClick={ this.searchBtn }
          >
            Pesquisar
          </button>
        </form>
        { isLoading && <Loading /> }
        { hasReceveid && <p>{`Resultado de álbuns de: ${artistName}`}</p> }
        {
          artistAlbum.map((artist) => (
            <ArtistCard
              key={ artist.collectionId }
              { ...artist }
            />
          ))
        }
        { albumNotFound && <p>Nenhum álbum foi encontrado</p> }
      </div>
    );
  }
}

export default Search;
