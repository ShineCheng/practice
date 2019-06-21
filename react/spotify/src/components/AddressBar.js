import React from 'react';
import history from '../history';

import '../style/AddressBar.css';

class AddressBar extends React.Component {
    state = {term : ''}
    onChangeSearch = (event) => {
        history.push(`/search/${event.target.value}`)
    }

    render() {
        return (
            <div className="addressBar">
                <div className="address">
                    <div className="back" onClick={history.goBack}>
                        <i className="angle left icon"></i>
                    </div>
                    <div className="forward" onClick={history.goForward}>
                        <i className="angle right icon"></i>
                    </div>
                </div>
                <input className="search" placeholder="搜尋" onChange={this.onChangeSearch} />
            </div>
        )
    }
};

export default AddressBar;