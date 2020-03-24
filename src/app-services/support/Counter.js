import React from 'react';
import { connect } from 'react-redux';
import * as actionType from './redux/actionTypes'
import * as actions from './redux/actions'

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSingleUser: false,
            showAllUsers: false
        }
    }
    getUserData = () => {
        this.setState({ showSingleUser: true, showAllUsers: false })
        this.props.getUserData(1);
    }
    getAllUsers = () => {
        this.setState({ showSingleUser: false, showAllUsers: true })
        this.props.getAllUsers()
    }
    render() {
        const counterPanelStyle = {
            flex: '1',
            width: '15em',
            color: "#efefef",
            backgroundColor: '#464646',
            border: 'solid 0.5px #2f2f2f',
            textAlign: 'center'
        };
        const counterPanelStyle2 = {
            ...counterPanelStyle,
            marginLeft: '5px'
        }
        const sectionHeaderStyle = {
            width: '100%',
            backgroundColor: '#181818',
            borderBottom: 'solid 0.5px #5e5e5e'
        }
        return (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={counterPanelStyle}>
                    <div style={sectionHeaderStyle}>{'Non Middleware Redux'}</div>
                    {'Counter: '}{this.props.counter}
                    <br />
                    <button className="searchBtn" onClick={() => this.props.onIncrement(10)}>
                        {'INC'}
                    </button>
                    &nbsp;&nbsp;
                    <button className="searchBtn" onClick={() => this.props.onDecrement(5)}>
                        {'DEC'}
                    </button>
                </div>
                <div style={counterPanelStyle2}>
                    <div style={sectionHeaderStyle}>{'With Middleware'}</div>
                    <div style={{ marginTop: '5px' }}>
                        <button className="searchBtn" onClick={this.getUserData}>
                            {'Get 1st User'}
                        </button>
                        &nbsp;&nbsp;
                        <button className="searchBtn" onClick={this.getAllUsers}>
                            {'Users Count'}
                        </button>
                    </div>
                    <div style={{ marginTop: '5px' }}>
                        {this.state.showSingleUser
                            ? <span>
                                {this.props.userData !== null
                                    ? <span>{'First User: '}{this.props.userData.title}</span>
                                    : <span>{'Fetching'}</span>
                                }
                            </span>
                            : null
                        }
                        {this.state.showAllUsers
                            ? <span>
                                {this.props.allUsers !== null
                                    ? <span>{'Total Users: '}{this.props.allUsers.length}</span>
                                    : <span>{'Fetching'}</span>
                                }
                            </span>
                            : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        counter: state.support.counter,
        userData: state.support.userData,
        allUsers: state.support.allUsers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIncrement: (value) => dispatch({ type: actionType.INCREMENT, payload: value }),
        onDecrement: (value) => dispatch({ type: actionType.DECREMENT, payload: value }),
        getUserData: (value) => dispatch(actions.getSingleUser(value)),
        getAllUsers: () => dispatch(actions.getAllUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);