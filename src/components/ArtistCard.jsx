import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ArtistCard extends Component {
  render() {
    const {
      artistName, collectionId, collectionName, artworkUrl100: imgUrl,
    } = this.props;
    return (
      <div>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <div>
            <img src={ imgUrl } alt={ artistName } />
            <h3>{artistName}</h3>
            <h4>{collectionName}</h4>
          </div>
        </Link>
      </div>
    );
  }
}

export default ArtistCard;

const { string, number } = PropTypes;

ArtistCard.propTypes = {
  artistName: string.isRequired,
  collectionId: number.isRequired,
  collectionName: string.isRequired,
  artworkUrl100: string.isRequired,
};
