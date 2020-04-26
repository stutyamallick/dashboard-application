import React from 'react';
import './index.css';
import logo from '../resources/images/logo.svg';
import logout from '../resources/images/logout.svg';
import moment from 'moment';

export default function Header(props) {
    const currentLogin = moment(new Date()).format('ddd, DD/MM/YY hh:mm A');
    return (
        <React.Fragment>
            <div className="app_logo_container">
                <img src={logo} alt="logo" className="app_logo" />
            </div>
            <div className="app_title_container">
                <label className="app_title">{props.applicationName}</label>
            </div>
            <div className="user_detail_container">
                <div>
                    <div className="user_detail_text">Signed in as Stutya Mallick</div>
                    <div className="user_detail_text">Current login: {currentLogin}</div>
                    <div className="user_detail_text">
                        <img src={logout} alt="logout" className="app_logout" />
                        SignOut&nbsp;&nbsp;
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
