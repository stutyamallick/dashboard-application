import React from 'react';
import UserName from './UserName'
import {UserContext} from './user-context'

export default class UserData extends React.Component{
    static contextType = UserContext;
    componentDidMount(){
        console.log('CDM: UserData.js (Level 3)')
    }
    componentDidUpdate(){
        console.log('CDU: UserData.js (Level 3)')
    }
    userNameChange = (e) =>{
        this.context.userNameChange(e.target.value)
    }
    render(){
        return(
            <React.Fragment>
                <div>
                    <label className="elementLbl">Enter User Name (3rd)</label>
                    <br/>
                    <input 
                        type="text" 
                        className="textTypeSearch" 
                        value={this.context.userName}
                        onChange={this.userNameChange}/>
                </div>
                <br/>
                <UserName />
            </React.Fragment>
        )
    }
}