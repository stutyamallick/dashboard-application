import React from 'react';
import './index.css';
import logo from '../logo.svg';

class Header extends React.Component {
    render() {
        return (
            <div className="rowFlex">
                <div className="flex-2 app-logoCt"><img src={logo} className="app-logo" alt="logo" /></div>
                <div className="flex-4 app-titleCt">
                    <label className="app-title">{this.props.applicationName}</label>
                </div>
                <div className="flex-2 rev-rowFlex">
                    <div className="colFlex app-userDetCt">
                        <div className="app-userDetText">
                            SignedIn as Stutya Mallick</div>
                        <div className="app-userSignoutText rev-rowFlex">SignOut</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;