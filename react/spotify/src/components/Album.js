import React from 'react';
import { Link } from 'react-router-dom';

import { IMAGE_DOMAIN } from '../config';

class Album extends React.Component {
    renderCoverSrc() {
        if ( this.props.album.songs ) {
            return `${IMAGE_DOMAIN}/images/collection/${this.props.album.coverImageURL}`
        } else {
            return `${IMAGE_DOMAIN}/images/album/${this.props.album.coverImageURL}`
        }
    }

    render() {
        const { id, title, description } = this.props.album;
        return (
            <div className="album">
                <Link to={`/playList/${this.props.type}/${id}`}>
                    <img className="cover" src={this.renderCoverSrc()} />
                </Link>
                <div className="title">{title}</div>
                <div className="description">{description}</div>
            </div>
        )
    }
};

export default Album;