import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    artistName: '',
    collectionName: '',
    imgUrl: '',
    listOfMusics: [],
    arrFavMusics: [],
    loading: false,
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getMusicsList(id);
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

  getMusicsList = async (id) => {
    const musics = await getMusics(id);
    const musicsList = musics.filter(({ kind }) => kind === 'song');
    this.setState({
      artistName: musics[0].artistName,
      collectionName: musics[0].collectionName,
      imgUrl: musics[0].artworkUrl100,
      listOfMusics: musicsList,
    });
  }

  addFavSong = async ({ target }) => {
    this.setState({ loading: true });

    const { checked, id } = target;
    const { listOfMusics } = this.state;
    if (checked) {
      const musicChecked = listOfMusics.find(({ trackId }) => trackId === Number(id));
      await addSong(musicChecked);
      this.setState({ loading: false }, () => this.getFavMusics());
    }
  }

  render() {
    const {
      artistName, collectionName, imgUrl, listOfMusics, arrFavMusics, loading,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading && <Loading /> }
        <div>
          <h3 data-testid="artist-name">{ artistName }</h3>
          <h3 data-testid="album-name">{ collectionName }</h3>
          <img src={ imgUrl } alt={ artistName } />
          {
            listOfMusics.map((music) => (
              <MusicCard
                key={ music.trackName }
                music={ music }
                onChange={ (event) => this.addFavSong(event) }
                checked={ arrFavMusics.some(({ trackId }) => trackId === music.trackId) }
              />
            ))
          }
        </div>
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
