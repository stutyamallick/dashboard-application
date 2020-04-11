import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './Layout.css';
import Header from './app-header/index';
import NavigationPanel from './components/navigation-panel/index';

/* Lazy loading of React Router Components */
const Home = React.lazy(() => import('./app-services/home/Home'))
const Support = React.lazy(() => import('./app-services/support/Support'))
const Maintenance = React.lazy(() => import('./app-services/maintenance/index'))
const Report = React.lazy(() => import('./app-services/report/Report'))
const PageNotFound = React.lazy(() => import('./ErrorPage'))

export default class Layout extends React.Component {
    render() {
        return (
            <div className="layout">
                <div className="app_header_container">
                    <Header applicationName="Dashboard Application" />
                </div>
                <Router>
                    <div className="app_navigation_panel_container">
                        <NavigationPanel />
                    </div>
                    <div className="app_route_service_container">
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
                </Router>
            </div>
        )
    }
}