import React from 'react';
import { connect } from 'react-redux';
import { selectSong, songPlay, songPause } from '../actions';

import '../style/Buttons.css';

class Buttons extends React.Component {
    onPlayClick = () => {
        if ( !this.props.currentSong ) {
            this.props.selectSong(this.props.currentPlayList.songs[0]);

            this.props.songPlay();
        } else {
            const isInPlayList = this.props.currentPlayList.songs.find((song) => {
                return song.id === this.props.currentSong.id
            })
            if ( !isInPlayList ) {
                this.props.selectSong(this.props.currentPlayList.songs[0]);
                this.props.songPlay();
            } else {
                if ( this.props.currentSongStatus === 'play' ) {
                    this.props.songPause();
                } else {
                    this.props.songPlay();
                }
            }
        }
    }

    render() {
        return (
            <div className="buttons">
                <div className="play" onClick={this.onPlayClick}>
                    { this.props.currentSongStatus === 'play' ? '暫停' : '播放' }
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return { currentSongStatus: state.currentSongStatus,
             currentPlayList: state.currentPlayList,
             currentSong: state.currentSong };
}

export default connect(mapStateToProps, {
    selectSong: selectSong,
    songPlay: songPlay,
    songPause: songPause
})(Buttons);