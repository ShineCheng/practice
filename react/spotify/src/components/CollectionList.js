import React from 'react';
import { connect } from 'react-redux';
import { selectCollectionsList, selectAlbums } from '../actions';

import Album from './Album';

import '../style/CollectionList.css';

class CollectionList extends React.Component {
    componentDidMount() {
        this.props.selectCollectionsList();
        this.props.selectAlbums();
    }

    renderCollectionsList() {
        return this.props.collectionsList.map((collectionList) => {
            return (
                <div className="collection" key={collectionList.id}>
                    <h2>{collectionList.title}</h2>
                    {this.renderCollections(collectionList.collections)}
                </div>
            )
        })
    }

    renderCollections(collections) {
        return collections.map((data) => {
            return (
                <Album album={data} type="collection" key={data.id} />
            )
        })
    }

    renderAlbums() {
        return this.props.albums.map((data) => {
            return <Album album={data} type="album" key={data.id} />
        })
    }

    render() {
        return (
            <React.Fragment>
                <h1>首頁</h1>
                {this.renderCollectionsList()}
                <div className="collection">
                    <h2>專輯</h2>
                    {this.renderAlbums()}
                </div>
            </React.Fragment>
        )
    }
};

const mapStateToProps = (state) => {
    return { collectionsList: state.collectionsList,
             albums: state.albums };
};

export default connect(mapStateToProps, {
    selectCollectionsList: selectCollectionsList,
    selectAlbums: selectAlbums
})(CollectionList);