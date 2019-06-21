import collectionsList from '../data/collectionsList';
import collections from '../data/collections';
import albums from '../data/albums';
import songs from '../data/songs';
import artists from '../data/artists';

import _ from 'lodash';

export const selectCollectionsList = () => {
    console.log(collectionsList)
    collectionsList.forEach((collectionList) => {
        let newCollections = [];
        collectionList.collectionsID.forEach((id) => {
            const newCollection = collections.find((collection) => {
                return collection.id === id
            });
            newCollections.push(newCollection)
        });
        collectionList.collections = newCollections;
    });

    return {
        type: 'SELECT_COLLECTIONS_LIST',
        payload: collectionsList
    };
};

export const selectAlbums = () => {
    return {
        type: 'SELECT_ALBUMS',
        payload: albums
    };
};

export const selectSong = (song) => {
    return {
        type: 'SELECT_SONG',
        payload: song
    };
};

export const selectPlayList = ({ type, id }) => (dispatch, getState) => {
    id = parseInt(id);

    console.log(type)

    let payload = {};
    if ( type === 'collection' ) {
        payload = collections.find((collection) => {
            return collection.id === id
        });

        let newSongs = [];
        payload.songs.forEach((id) => {
            const newSong = songs.find((song) => {
                return song.id === id ? song : false
            });
            if ( newSong ) {
                newSongs.push(newSong)
            }
        });
        payload.songs = newSongs;

        payload.artist = 'spotify';
    } else if ( type === 'album' ){
        payload = albums.find((album) => {
            return album.id === id
        });

        payload.songs = songs.filter((song) => {
            return song.albumID === payload.id
        });
        payload.artist = artists.find((artist) => {
            return artist.id === payload.artistID
        });
    } else if ( type === 'artist' ){
        payload = artists.find((artist) => {
            return artist.id === id
        });
        payload.artist = payload;

        payload.title = payload.name;

        const currentAlbums = albums.filter((album) => {
            return album.artistID === payload.id
        });

        payload.songs = [];
        currentAlbums.forEach((album) => {
            songs.forEach((song) => {
                if ( song.albumID === album.id ) {
                    payload.songs.push(song);
                }
            });
        });
    } else {
        payload.songs = getState().addSongs;
    }

    if ( type !== 'user' ) {
        payload.songs.forEach((song) => {
            song.album = albums.find((album) => {
                return album.id === song.albumID
            });
            song.artist = artists.find((artist) => {
                return artist.id === song.album.artistID
            });
        });
    }
    console.log(payload)

    dispatch ({
        type: 'SELECT_PLAY_LIST',
        payload: payload
    });
};

export const songPlay = () => {
    return {
        type: 'SONG_PLAY'
    };
};

export const songPause = () => {
    return {
        type: 'SONG_PAUSE'
    };
};

export const search = (value) => {
    const searchSongs = songs.filter((song) => {
        return song.title.toLowerCase().includes(value.toLowerCase())
    });

    const searchAlbums = albums.filter((album) => {
        return album.title.toLowerCase().includes(value.toLowerCase())
    });

    const searchArtist = artists.filter((artist) => {
        return artist.name.toLowerCase().includes(value.toLowerCase())
    });

    const searchCollections = collections.filter((collection) => {
        return collection.title.toLowerCase().includes(value.toLowerCase())
    });

    searchArtist.forEach((artist) => {
        const matchAlbums = albums.filter((album) => {
            const isInArray = searchAlbums.find((searchAlbum) => {
                return searchAlbum.id === album.id ? true : false;
            })

            return album.artistID === artist.id && !isInArray
        });
        searchAlbums.push(...matchAlbums);

        const searchAlbumsID = _.map(searchAlbums, 'id');
        const matchSongs = songs.filter((song) => {
            const isInArray = searchSongs.find((searchSong) => {
                return searchSong.id === song.id ? true : false;
            })

            return searchAlbumsID.includes(song.albumID) && !isInArray
        });
        searchSongs.push(...matchSongs);
    });

    searchSongs.forEach((song) => {
        song.album = albums.find((album) => {
            return album.id === song.albumID
        });
        song.artist = artists.find((artist) => {
            return artist.id === song.album.artistID
        });
    });

    searchAlbums.forEach((album) => {
        album.artist = artists.find((artist) => {
            return artist.id === album.artistID
        });
    });

    console.log({songs: searchSongs,
        albums: searchAlbums,
        artists: searchArtist,
        collections: searchCollections})

    return {
        type: 'SEARCH',
        payload: {songs: searchSongs,
                  albums: searchAlbums,
                  artists: searchArtist,
                  collections: searchCollections}
    };
};

export const addSong = (song) => {
    return {
        type: 'ADD_SONG',
        payload: song
    };
};

export const removeSong = (song) => {
    return {
        type: 'REMOVE_SONG',
        payload: song
    };
};

export const songVolume = (value) => {
    return {
        type: 'SONG_VOLUME',
        payload: value
    };
};

export const changeMainStatus = (value) => {
    return {
        type: 'CHANGE_MAIN_STATUS',
        payload: value
    };
};