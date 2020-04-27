import React from 'react';
import CustomerForm from './CustomerForm';
import Payment from './Payment';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/maintenance/actions';

class Maintenance extends React.Component {
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
                    <Route path='/maintenance/payment' component={Payment} />
                    { this.props.formRoutePermission
                        && <Route path='/maintenance/form' component={CustomerForm} />
                    }
                    <Redirect from="/maintenance/" to="/maintenance/payment" />
                </Switch>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        formRoutePermission: state.maintenance.formRoutePermission
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateFormRoutePermission: (value) => dispatch(actions.updateFormRoutePermission(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Maintenance);