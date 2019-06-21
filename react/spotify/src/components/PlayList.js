import React from 'react';
import { connect } from 'react-redux';
import { selectPlayList } from '../actions';

import { IMAGE_DOMAIN } from '../config';

import Buttons from './Buttons';
import Song from './Song';

import '../style/PlayList.css';

class PlayList extends React.Component {
    constructor(props) {
        super(props);

        this.state = { renderSongs: [],
                       filterValue: '' };
    }

    componentDidMount() {
        this.props.selectPlayList({ type: this.props.match.params.type, id: this.props.match.params.id });
    }

    componentDidUpdate(prevProps) {
        if ( prevProps.match.url !== this.props.match.url ) {
            this.props.selectPlayList({ type: this.props.match.params.type, id: this.props.match.params.id });
        }
    }

    renderTotalDuration() {
        let totalDuration = 0;
        this.props.currentPlayList.songs.map(function(item){
            totalDuration += item.duration;
        });
        const format = {};

        format.hours = Math.floor(totalDuration / 60 / 60);
        format.minute = Math.floor((totalDuration - (format.hours * 60 * 60)) / 60);
        format.second = Math.floor(totalDuration - (format.minute * 60) - (format.hours * 60 * 60) );
        return `${format.hours} 時 ${String(format.minute).padStart(2, '0')} 分`;
    }

    renderSongs() {
        if ( this.state.renderSongs.length === 0 && !this.state.filterValue ) {
            return this.props.currentPlayList.songs.map((song) => {
                if ( song ) {
                    return (
                        <Song song={song} mainStatus="playlist" key={song.id} />
                    )
                }
            });
        } else {
            return this.state.renderSongs.map((song) => {
                if ( song ) {
                    return (
                        <Song song={song} mainStatus="playlist" key={song.id} />
                    )
                }
            });
        }
    }

    filterSongs = (event) => {
        this.setState({ filterValue: event.target.value });

        let newSongs = [];
        newSongs = this.props.currentPlayList.songs;
        if ( event ) {
            newSongs = newSongs.filter((item) => {
                if ( item.title.toLowerCase().includes(event.target.value.toLowerCase()) ) {
                    return item
                }
            });
        }
        this.setState({renderSongs: newSongs});
    }

    render() {
        if ( this.props.currentPlayList ) {
            return (
                <React.Fragment>
                    <div className="header">
                        <img className="cover" src={`${IMAGE_DOMAIN}/images/${this.props.match.params.type}/${this.props.currentPlayList.coverImageURL}` } />
                        <div className="info">
                            <div className="type">
                                { this.props.match.params.type === 'collection' ? '播放列表' : '專輯' }
                            </div>
                            <div className="title">
                                {this.props.currentPlayList.title}
                            </div>
                            <div className="description">
                                {this.props.currentPlayList.description}
                            </div>
                            <div className="info">
                                建立者：<span>{this.props.currentPlayList.artist.name}</span>・<span>{this.props.currentPlayList.songs.length}</span>首歌曲, 
                                <span>{this.renderTotalDuration()}</span>
                            </div>
                            <Buttons />
                        </div>
                    </div>
                    <div className="search">
                        <i className="search icon"></i>
                        <input placeholder="篩選" onChange={this.filterSongs} />
                    </div>
                    <ul className="playlist">
                        <li className="header">
                            <div></div>
                            <div></div>
                            <div>標題</div>
                            <div>藝人</div>
                            <div>專輯</div>
                            <div>曲長</div>
                        </li>
                        {this.renderSongs()}
                    </ul>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    Loading...
                </React.Fragment>
            )
        }
    }
};

const mapStateToProps = (state) => {
    return { currentPlayList: state.currentPlayList,
             addSongs: state.addSongs };
}

export default connect(mapStateToProps, {
    selectPlayList: selectPlayList
})(PlayList);