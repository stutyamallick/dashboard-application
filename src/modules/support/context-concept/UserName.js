import React from 'react';
import {UserContext} from './user-context'
import {UserPreferenceContext} from './user-context'

export default class UserName extends React.Component{
    static contextType = UserContext;
    componentDidMount(){
        console.log('CDM: UserName.js (Level 4)')
    }
    componentDidUpdate(){
        console.log('CDU: UserName.js (Level 4)')
    }
    getClickAction = () =>{
        console.log('getClickAction child');
        this.context.getClickAction();
    }
    
    render(){
        return(
            <React.Fragment>
                {'(4th) Level'}
                &nbsp;&nbsp;<br/>
                {/* <span style={{color: '#4daec8'}}>{this.context.userName}</span>
                <span style={{color: '#efefef', cursor: 'pointer'}} onClick={this.context.getClickAction}>
                    Click this
                </span> */}
                <UserContext.Consumer>
                    {user => (
                        <UserPreferenceContext.Consumer>
                            {preference => (
                                <div>
                                    <span style={{color: '#efefef'}}>
                                        User Name is: 
                                    </span>
                                    &nbsp;&nbsp;
                                    <span style={{color: '#4daec8'}}>
                                        {user.userName}
                                    </span>
                                    <br/>
                                    <span style={{color: '#efefef'}}>
                                        Preferred Time Zone: 
                                    </span>
                                    &nbsp;&nbsp;
                                    <span style={{color: '#4daec8'}}>
                                        {preference.timeZone}
                                    </span>
                                </div>
                            )}
                        </UserPreferenceContext.Consumer>
                    )}
                </UserContext.Consumer>
            </React.Fragment>
        )
    }
}