import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

/* Lazy loading of React Router Components */
const Home = React.lazy(() => import('../app-services/home/Home'))
const Support = React.lazy(() => import('../app-services/support/Support'))
const Maintenance = React.lazy(() => import('../app-services/maintenance/index'))
const Report = React.lazy(() => import('../app-services/report/Report'))
const PageNotFound = React.lazy(() => import('../ErrorPage'))

class NavigationPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { homeBgClr: '#333333', supportBgClr: '#252526', maintenanceBgClr: '#252526', reportBgClr: '#252526' };
        this.onHomeClick = this.onHomeClick.bind(this);
        this.onSupportClick = this.onSupportClick.bind(this);
        this.onMaintenanceClick = this.onMaintenanceClick.bind(this);
        this.onReportClick = this.onReportClick.bind(this);
    }
    onHomeClick() {
        this.setState({ homeBgClr: '#333333', supportBgClr: '#252526', maintenanceBgClr: '#252526', reportBgClr: '#252526' });
    }
    onSupportClick() {
        this.setState({ homeBgClr: '#252526', supportBgClr: '#333333', maintenanceBgClr: '#252526', reportBgClr: '#252526' });
    }
    onMaintenanceClick() {
        this.setState({ homeBgClr: '#252526', supportBgClr: '#252526', maintenanceBgClr: '#333333', reportBgClr: '#252526' });
    }
    onReportClick() {
        this.setState({ homeBgClr: '#252526', supportBgClr: '#252526', maintenanceBgClr: '#252526', reportBgClr: '#333333' });
    }
    render() {
        return (
            <Router>
                <div>
                    <div className="app-navigationPnlCt rowFlex">
                        <div className="navPnl-serviceCt" style={{ backgroundColor: this.state.homeBgClr }}>
                            <Link to={'/home'} onClick={this.onHomeClick}>{'HOME'}</Link>
                        </div>
                        <div className="navPnl-serviceCt" style={{ backgroundColor: this.state.supportBgClr }}>
                            <Link to={'/support'} onClick={this.onSupportClick}>{'SUPPORT'}</Link>
                        </div>
                        <div className="navPnl-serviceCt" style={{ backgroundColor: this.state.maintenanceBgClr }}>
                            <Link to={'/maintenance'} onClick={this.onMaintenanceClick}>{'MAINTENANCE'}</Link>
                        </div>
                        <div className="navPnl-serviceCt" style={{ backgroundColor: this.state.reportBgClr }}>
                            <Link to={'/report'} onClick={this.onReportClick}>{'REPORT'}</Link>
                        </div>
                    </div>
                    <div className="router-serviceCt">
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <Switch>
                                <Route path='/home' component={Home} />
                                <Route path='/support' component={Support} />
                                <Route path='/maintenance' component={Maintenance} />
                                <Route path='/report' component={Report} />
                                <Redirect from="/" to="/home" />
                                <Route component={PageNotFound} />
                            </Switch>
                        </React.Suspense>
                    </div>
                </div>
            </Router>
        );
    }
}

export default NavigationPanel;