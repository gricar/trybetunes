import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    artistName: '',
    collectionName: '',
    listOfMusics: [],
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
      listOfMusics: musicsList,
    });
  }

  render() {
    const { artistName, collectionName, listOfMusics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h3 data-testid="artist-name">{ artistName }</h3>
          <h3 data-testid="album-name">{ collectionName }</h3>
          {/* <img src={ artworkUrl100 } alt={ artistName } /> */}
          {
            listOfMusics.map((music) => (
              <MusicCard
                key={ music.trackName }
                music={ music }
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
