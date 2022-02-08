import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { music: { trackId, trackName, previewUrl }, checked, onChange } = this.props;
    return (
      <div className="musicPlayer">
        <h3>{ trackName }</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento audio.
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ onChange }
            checked={ checked }
          />
        </label>
      </div>
    );
  }
}

export default MusicCard;

const { bool, func, number, string } = PropTypes;

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackId: number,
    trackName: string,
    previewUrl: string,
  }).isRequired,
  checked: bool.isRequired,
  onChange: func.isRequired,
};
