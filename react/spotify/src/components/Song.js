import React from 'react';
import { connect } from 'react-redux';
import { selectSong, changeMainStatus, songPlay, addSong, removeSong } from '../actions';

class Song extends React.Component {
    renderSelectClass() {
        if ( ( this.props.currentSong != undefined ) &&
             ( this.props.currentSong.id === this.props.song.id ) ) {
            return "select";
        } else {
            return null;
        }
    }

    renderDuration() {
        const format = {};

        format.hours = Math.floor(this.props.song.duration / 60 / 60);
        format.minute = Math.floor((this.props.song.duration - (format.hours * 60 * 60)) / 60);
        format.second = Math.floor(this.props.song.duration - (format.minute * 60) - (format.hours * 60 * 60) );
        return `${format.hours === 0 ? '' : format.hours + ':'} ${format.minute} : ${String(format.second).padStart(2, '0')}`;
    }

    renderPlayBtnClass() {
        if ( this.renderSelectClass() === 'select' && this.props.currentSongStatus === 'play' ) {
            return "pause";
        } else {
            return "play";
        }
    }

    renderAddBtnClass() {
        const inAddSongs = this.props.addSongs.find((song) => {
            return song.id === this.props.song.id;
        });
        if ( inAddSongs ) {
            return "check";
        } else {
            return "plus";
        }
    }

    onPlayClick = () => {
        this.props.selectSong(this.props.song);
        this.props.changeMainStatus(this.props.mainStatus);
        this.props.songPlay();
    }

    onAddClick = () => {
        const inAddSongs = this.props.addSongs.find((song) => {
            return song.id === this.props.song.id;
        });
        if ( inAddSongs ) {
            this.props.removeSong(this.props.song);
        } else {
            this.props.addSong(this.props.song);
        }
    }

    render() {
        console.log(this.props)
        return (
            <li className={this.renderSelectClass()}>
                <div className="playBtn" onClick={this.onPlayClick}>
                    <i className="volume up icon"></i>
                    <i className={`${this.renderPlayBtnClass()} icon`}></i>
                </div>
                <div className="addBtn" onClick={this.onAddClick}>
                    <i className={`${this.renderAddBtnClass()} icon`}></i>
                </div>
                <div className="title">{this.props.song.title}</div>
                <div className="artist">{this.props.song.artist.name}</div>
                <div className="album">{this.props.song.album.title}</div>
                <div className="duration">{this.renderDuration()}</div>
            </li>
        )
    }
};

const mapStateToProps = (state) => {
    return { currentSong: state.currentSong,
             addSongs: state.addSongs,
             currentSongStatus: state.currentSongStatus };
}

export default connect(mapStateToProps, {
    selectSong: selectSong,
    changeMainStatus: changeMainStatus,
    songPlay: songPlay,
    addSong: addSong,
    removeSong: removeSong
})(Song);