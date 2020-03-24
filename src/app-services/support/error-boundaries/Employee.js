import React from 'react';
import ErrorBoundary from './ErrorBoundary'
import EmployeeInfo from './EmployeeInfo'

export default class Employee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const sectionStyle = {
            padding: '0.5rem',
            paddingLeft: '0.5rem',
            marginLeft: '1rem',
            width: '20rem',
            backgroundColor: "rgb(70, 70, 70)",
            float: 'left',
            height: '100%'
        }
        const sectionHeaderStyle = {
            width: '100%',
            backgroundColor: '#181818',
            borderBottom: 'solid 0.5px #5e5e5e',
            textAlign: 'center'
        }
        return (
            <div style={sectionStyle}>
                <div style={sectionHeaderStyle}>{'Error Boundaries'}</div>
                <ErrorBoundary>
                    <EmployeeInfo />
                </ErrorBoundary>
            </div>
        )
    }
}