import React from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { selectSong, songPlay, songPause, songVolume, addSong, removeSong } from '../actions';

import { IMAGE_DOMAIN } from '../config';

import '../style/ControlBar.css';

class ControlBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = { progress: 0,
                       progressInPercent: 0,
                       left: 0, 
                       durationInSeconds: 0 };
        this.videoRef = React.createRef();
        this.songLineRef = React.createRef();
        this.soundLineRef = React.createRef();
    }

    onYoutubeStart = () => {
        this.setState({ durationInSeconds: this.videoRef.current.getDuration() });
    }
 
    onYoutubeProgress = (event) => {
        this.setState({ progress: this.formatTime(event.playedSeconds),
                        progressInPercent: event.played,
                        left: this.formatTime(this.state.durationInSeconds - event.playedSeconds) });
    } 

    onYoutubeChangeStatus = () => {
        if (this.props.currentSongStatus === 'play') {
            return <i className="pause icon"></i>
        }
        return <i className="play icon"></i>
    }

    formatTime(time) {
        const format = {};

        format.hours = Math.floor(time / 60 / 60);
        format.minute = Math.floor((time - (format.hours * 60 * 60)) / 60);
        format.second = Math.floor(time - (format.minute * 60) - (format.hours * 60 * 60) );

        return `${format.hours === 0 ? '' : format.hours + ':'}
                ${format.minute}:
                ${String(format.second).padStart(2, '0')}`;
    }

    renderAddBtnClass() {
        const inAddSongs = this.props.addSongs.find((song) => {
            return song.id === this.props.currentSong.id;
        });
        if ( inAddSongs ) {
            return "check";
        } else {
            return "plus";
        }
    }

    getArtist(album) {
        const artist = this.props.artists.find((item, index, array) => {
            return item.id === album.artistID
        });
        return artist;
    }

    getAlbumAndArtist(song) {
        const album = this.props.albums.find((item, index, array) => {
            return item.id === song.albumID
        });
        return { album: album, artist: this.getArtist(album)};
    }

    onPlayClick = () => {
        this.props.currentSongStatus === "play" ? this.props.songPause() : this.props.songPlay()
    }

    onForewardClick = () => {
        let song = {};
        const playList = this.props.currentMainStatus === 'playlist' ? this.props.currentPlayList.songs : this.props.addSongs;
        playList.forEach((item, index, array) => {
            if ( item.id === this.props.currentSong.id ) {
                if ( index + 1 >= playList.length ) {
                    song = playList[0];
                } else {
                    song = playList[index + 1];
                }
            }
        });

        this.props.selectSong(song);
    }

    onBackwardClick = () => {
        let song = {};
        const playList = this.props.currentMainStatus === 'playlist' ? this.props.currentPlayList.songs : this.props.addSongs;
        playList.forEach((item, index, array) => {
            if ( item.id === this.props.currentSong.id ) {
                if ( index - 1 < 0 ) {
                    song = playList[playList.length - 1];
                } else {
                    song = playList[index - 1];
                }
            }
        });

        this.props.selectSong(song);
    }

    onSongLineClick = (event) => {
        const percent = event.nativeEvent.offsetX / this.songLineRef.current.clientWidth;
        this.videoRef.current.seekTo(this.state.durationInSeconds * percent, 'seconds');
    }

    onSoundLineClick = (event) => {
        this.props.songVolume(event.nativeEvent.offsetX / this.soundLineRef.current.clientWidth);
    }

    onAddBtnClick = () => {
        const inAddSongs = this.props.addSongs.find((song) => {
            return song.id === this.props.currentSong.id;
        });
        if ( inAddSongs ) {
            this.props.removeSong(this.props.currentSong);
        } else {
            this.props.addSong(this.props.currentSong);
        }
    }

    render() {
        if ( !this.props.currentSong ) {
            return (
                <div className="controlBar" style={{display: "none"}}></div>
            )
        } else {
            return (
                <div className="controlBar">
                    <div className="left">
                        <img className="cover" src={`${IMAGE_DOMAIN}/images/album/${this.props.currentSong.album.coverImageURL}`} />
                        <div className="info">
                            <div className="title">{this.props.currentSong.title}</div>
                            <div className="addBtn" onClick={this.onAddBtnClick}>
                                <i className={`${this.renderAddBtnClass()} icon`}></i>
                            </div>
                            <div className="artist">{this.props.currentSong.artist.name}</div>
                        </div>
                    </div>
                    <div className="center">
                        <ReactPlayer
                            ref={this.videoRef}
                            className="youtube"
                            url={`https://www.youtube.com/watch?v=${this.props.currentSong.youtubeID}`}
                            playing={this.props.currentSongStatus === 'play'}
                            volume={this.props.currentSongVolume}
                            onStart={this.onYoutubeStart}
                            onProgress={this.onYoutubeProgress} 
                            onEnded={this.onForewardClick}
                        />
                        <div className="controls">
                            <div className="backwardBtn" onClick={this.onBackwardClick}>
                                <i className="step backward icon"></i>
                            </div>
                            <div className="playBtn" onClick={this.onPlayClick}>
                                {this.onYoutubeChangeStatus()}
                            </div>
                            <div className="forewardBtn" onClick={this.onForewardClick}>
                                <i className="step forward icon"></i>
                            </div>
                        </div>
                        <div className="progress">
                            <div className="passedTime">{this.state.progress}</div>
                            <div className="line" ref={this.songLineRef} onClick={this.onSongLineClick}>
                                <div style={{width: `${this.state.progressInPercent * 100}%`}}></div>
                            </div>
                            <div className="leftTime">{this.state.left}</div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="volumeBtn">
                            <i className="volume up icon"></i>
                        </div>
                        <div className="line" ref={this.soundLineRef} onClick={this.onSoundLineClick}>
                            <div style={{width: `${this.props.currentSongVolume * 100}%`}}></div>
                        </div>
                    </div>
                </div>
            )
        }
    }
};

const mapStateToProps = (state) => {
    return { currentSong: state.currentSong,
             currentPlayList: state.currentPlayList,
             currentSongStatus: state.currentSongStatus,
             currentSongVolume: state.songVolume,
             currentMainStatus: state.currentMainStatus,
             addSongs: state.addSongs }
}

export default connect(mapStateToProps, {
    selectSong: selectSong,
    songPlay: songPlay,
    songPause: songPause,
    songVolume: songVolume,
    addSong: addSong,
    removeSong: removeSong
})(ControlBar);