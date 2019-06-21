import React from 'react';
import { Link } from 'react-router-dom';

import { IMAGE_DOMAIN } from '../config';

class SearchList extends React.Component {
    renderCoverSrc() {
        switch (this.props.type) {
            case 'song':
                return `${IMAGE_DOMAIN}/images/album/${this.props.data.album.coverImageURL}`;
            case 'artist':
                return `${IMAGE_DOMAIN}/images/artist/${this.props.data.coverImageURL}`;
            case 'album':
                return `${IMAGE_DOMAIN}/images/album/${this.props.data.coverImageURL}`;
            case 'collection':
                return `${IMAGE_DOMAIN}/images/collection/${this.props.data.coverImageURL}`;
        }
    }

    renderTitle() {
        switch (this.props.type) {
            case 'song':
                return this.props.data.title;
            case 'artist':
                return this.props.data.name;
            case 'album':
                return this.props.data.title;
            case 'collection':
                return this.props.data.title;
        }
    }

    renderArtist() {
        switch (this.props.type) {
            case 'song':
                return <div className="artist">{this.props.data.artist.name}</div>
            case 'album':
                return <div className="artist">{this.props.data.artist.name}</div>
        }
    }

    renderPlayList() {
        switch (this.props.type) {
            case 'song':
                return `album/${this.props.data.album.id}`;
            case 'artist':
            case 'album':
            case 'collection':
                return `${this.props.type}/${this.props.data.id}`;
        }
    }

    render() {
        return (
            <Link to={`/playList/${this.renderPlayList()}`}>
                <div className="item">
                    <img className="cover" src={this.renderCoverSrc()} />
                    <div className="info">
                        <div className="title">{this.renderTitle()}</div>
                        {this.renderArtist()}
                    </div>
                </div>
            </Link>
        )
    }
};

export default SearchList;