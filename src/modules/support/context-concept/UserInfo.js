import React from 'react';
import UserData from './UserData'

export default class UserInfo extends React.Component{
    componentDidMount(){
        console.log('CDM: UserInfo.js (Level 2)')
    }
    componentDidUpdate(){
        console.log('CDU: UserInfo.js (Level 2)')
    }
    render(){
        return(
            <React.Fragment>
                <UserData />
            </React.Fragment>
        )
    }
}