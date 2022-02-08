import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    arrFavMusics: [],
    loading: false,
  }

  componentDidMount() {
    this.getFavMusics();
  }

  getFavMusics = async () => {
    this.setState({ loading: true });
    const favsMusics = await getFavoriteSongs();
    if (!favsMusics) this.setState({ loading: false });
    if (favsMusics) {
      this.setState({
        loading: false,
        arrFavMusics: favsMusics,
      });
    }
  }

  addOrRemoveFavSong = async ({ target }) => {
    this.setState({ loading: true });

    const { checked, id } = target;
    const { arrFavMusics } = this.state;
    const musicChecked = arrFavMusics.find(({ trackId }) => trackId === Number(id));
    if (checked) {
      await addSong(musicChecked);
    } else {
      await removeSong(musicChecked);
    }
    this.setState({ loading: false }, () => this.getFavMusics());
  }

  render() {
    const { arrFavMusics, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <p>Favorites Page</p>
        {
          loading
            ? <Loading />
            : (
              <div>
                {
                  arrFavMusics.map((music) => (
                    <MusicCard
                      key={ music.trackName }
                      music={ music }
                      onChange={ (event) => this.addOrRemoveFavSong(event) }
                      checked={ arrFavMusics
                        .some(({ trackId }) => trackId === music.trackId) }
                    />
                  ))
                }
              </div>
            )
        }
      </div>
    );
  }
}

export default Favorites;
