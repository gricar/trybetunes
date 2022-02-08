import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    artistName: '',
    collectionName: '',
    imgUrl: '',
    listOfMusics: [],
    loading: false,
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getMusicsList(id);
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
      this.setState({ loading: false });
    }
  }

  render() {
    const { artistName, collectionName, imgUrl, listOfMusics, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          {
            loading && <Loading />
          }
          <h3 data-testid="artist-name">{ artistName }</h3>
          <h3 data-testid="album-name">{ collectionName }</h3>
          <img src={ imgUrl } alt={ artistName } />
          {
            listOfMusics.map((music) => (
              <MusicCard
                key={ music.trackName }
                music={ music }
                onClick={ (event) => this.addFavSong(event) }
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
