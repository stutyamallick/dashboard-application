import React from 'react';
import Counter from './Counter';
import UserBar from './context-concept/UserBar';
import Employee from './error-boundaries/Employee';

class Support extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="rowFlex support-searchCriteriaCt">
                    <Counter />
                </div>
                <br />
                <div className="support-searchCriteriaCt" style={{ color: "#efefef", height: '20rem' }}>
                    <UserBar />
                    <Employee />
                </div>
            </React.Fragment>
        );
    }
}

export default Support;