import React from 'react';
import CustomerForm from './CustomerForm';
import MaintenanceMain from './Maintenance';
import { Route, Switch, NavLink } from 'react-router-dom';

export default class Maintenance extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div style={{ textAlign: 'center' }}>
                    <label className="elementLbl">
                        <NavLink activeClassName="active-link" to="/maintenance/payment">
                            Make Payment</NavLink>
                    </label>
                    &nbsp;&nbsp;
                    <label className="elementLbl">
                        <NavLink activeClassName="active-link" to="/maintenance/form">
                            Fill Form</NavLink>
                    </label>
                </div>
                <Switch>
                    <Route path='/maintenance/payment' component={MaintenanceMain} />
                    <Route path='/maintenance/form' component={CustomerForm} />
                </Switch>
            </React.Fragment>
        )
    }
}