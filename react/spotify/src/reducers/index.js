import { combineReducers } from 'redux';
import _ from 'lodash';

const selectCollectionsListReducer = (state = [], action) => {
    if ( action.type === 'SELECT_COLLECTIONS_LIST' ) {
        return action.payload;
    }

    return state;
}

const selectAlbumsReducer = (state = [], action) => {
    if ( action.type === 'SELECT_ALBUMS' ) {
        return action.payload;
    }

    return state;
}

const changeMainStatusReducer = (state = null, action) => {
    if ( action.type === 'CHANGE_MAIN_STATUS' ) {
        return action.payload;
    }

    return state;
}

const selectPlayListReducer = (state = null, action) => {
    if ( action.type === 'SELECT_PLAY_LIST' ) {
        return action.payload;
    }

    return state;
}

const selectSongReducer = (state = null, action) => {
    if ( action.type === 'SELECT_SONG' ) {
        return action.payload;
    }

    return state;
}

const changeSongStatusReducer = (state = 'pause', action) => {
    switch (action.type) {
        case 'SONG_PLAY':
            return 'play';
        case 'SONG_PAUSE':
            return 'pause';
        default:
            return state;
    }
}

const searchReducer = (state = null, action) => {
    if ( action.type === 'SEARCH' ) {
        return action.payload;
    }

    return state;
}

const addSongsReducer = (state = [], action) => {
    if ( action.type === 'ADD_SONG' ) {
        const inStateSong = state.find((item) => {
            return item.id === action.payload.id
        })
        if ( inStateSong ) {
            return state;
        } else {
            return [...state, action.payload];
        }
    } else if  ( action.type === 'REMOVE_SONG' ) {
        return state.filter((item) => {
            return item.id != action.payload.id
        })
    } else {
        return state;
    }
}

const songVolumeReducer = (state = 0.5, action) => {
    if ( action.type === 'SONG_VOLUME' ) {
        return action.payload;
    }

    return state;
}

export default combineReducers({
    collectionsList: selectCollectionsListReducer,
    albums: selectAlbumsReducer,
    currentSong: selectSongReducer,
    currentMainStatus: changeMainStatusReducer,
    currentPlayList: selectPlayListReducer,
    currentSongStatus: changeSongStatusReducer,
    searchResult: searchReducer,
    addSongs: addSongsReducer,
    songVolume: songVolumeReducer
})