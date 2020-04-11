import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

export default class NavigationPanel extends React.Component {
    render() {
        return (
            <div className="navigation_panel_container">
                <NavLink activeClassName="active_route_link" to={'/home'}>
                    <div className="router_link_container">{'Home'}</div>
                </NavLink>
                <NavLink activeClassName="active_route_link" to={'/support'}>
                    <div className="router_link_container">{'Support'}</div>
                </NavLink>
                <NavLink activeClassName="active_route_link" to={'/maintenance'}>
                    <div className="router_link_container">{'Maintenance'}</div>
                </NavLink>
                <NavLink activeClassName="active_route_link" to={'/report'}>
                    <div className="router_link_container">{'Report'}</div>
                </NavLink>
            </div>
        );
    }
}