import React from 'react';
import { connect } from 'react-redux';
import { search } from '../actions';

import SearchItem from './SearchItem';

import '../style/Search.css';

class Search extends React.Component {
    componentDidMount() {
        this.props.search(this.props.match.params.value);
    }

    componentDidUpdate(prevProps) {
        if ( prevProps.match.params.value !== this.props.match.params.value ) {
            this.props.search(this.props.match.params.value);
        }
    }

    renderSearchSongs() {
        if ( this.props.searchResult.songs != undefined && this.props.searchResult.songs.length > 0 ) {
            const songs = this.props.searchResult.songs.map((song) => {
                return <SearchItem data={song} type="song" key={`song-${song.id}`} />
            });

            return (
                <div className="searchCatalog">
                    <h2>歌曲</h2>
                    {songs}
                </div>
            )
        } else {
            return null
        }
    }

    renderSearchArtists() {
        if ( this.props.searchResult.artists != undefined && this.props.searchResult.artists.length > 0 ) {
            const artists = this.props.searchResult.artists.map((artist) => {
                return <SearchItem data={artist} type="artist" key={`artist-${artist.id}`} />
            });

            return (
                <div className="searchCatalog">
                    <h2>藝人</h2>
                    {artists}
                </div>
            )
        } else {
            return null
        }
    }

    renderSearchAlbums() {
        if ( this.props.searchResult.albums != undefined && this.props.searchResult.albums.length > 0 ) {
            const albums = this.props.searchResult.albums.map((album) => {
                return <SearchItem data={album} type="album" key={`album-${album.id}`} />
            });

            return (
                <div className="searchCatalog">
                    <h2>專輯</h2>
                    {albums}
                </div>
            )
        } else {
            return null
        }
    }

    renderSearchCollections() {
        if ( this.props.searchResult.collections != undefined && this.props.searchResult.collections.length > 0 ) {
            const collections = this.props.searchResult.collections.map((collection) => {
                return <SearchItem data={collection} type="collection" key={`collection-${collection.id}`} />
            });

            return (
                <div className="searchCatalog">
                    <h2>播放列表</h2>
                    {collections}
                </div>
            )
        } else {
            return null
        }
    }

    render() {
        if ( this.props.searchResult ) {
            return (
                <div className="searchWrap">
                    {this.renderSearchSongs()}
                    {this.renderSearchArtists()}
                    {this.renderSearchAlbums()}
                    {this.renderSearchCollections()}
                </div>
            )
        } else {
            return (
                <div className="searchWrap">
                    Loading...
                </div>
            )
        }
    }
};

const mapStateToProps = (state) => {
    return { searchResult: state.searchResult };
}

export default connect(mapStateToProps, {
    search: search
})(Search);