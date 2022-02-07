import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { music: { trackId, trackName, previewUrl } } = this.props;
    return (
      <div className="musicPlayer">
        <h3>{ trackName }</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento audio.
        </audio>
        {/* <label htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label> */}
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackId: PropTypes.number,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
};
