import React from 'react';
import {UserDefaultContext} from './user-context'

export default class UserDefault extends React.Component{
    
    static contextType = UserDefaultContext;    
    
    render(){
        return(
            <React.Fragment>
                <span style={{color: '#efefef', cursor: 'pointer'}} >
                    User default id:&nbsp;{this.context.userId}
                </span>
            </React.Fragment>
        )
    }
}