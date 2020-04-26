import React from 'react';
import UserInfo from './UserInfo';
import UserDefault from './UserDefault';
import {UserContext} from './user-context';
import {UserPreferenceContext} from './user-context'

export default class UserBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userName: 'Stutya M',
            getClickAction: this.getClickAction,
            userNameChange: this.userNameChange
        }
        this.getClickAction = this.getClickAction.bind(this)
    }

    componentDidMount(){
        console.log('CDM: UserBar.js (Level 1)')
    }

    componentDidUpdate(){
        console.log('CDU: UserBar.js (Level 1)')
    }

    onUserNameChange = (e) =>{
        this.setState({ userName: e.target.value })
    }
    userNameChange = (value) => {
        this.setState({userName: value})
    }
    getClickAction = () => {
        console.log('Inside getClickAction method')
    }
    render(){
        const userPreferenceContext = {
            timeZone: 'UTC'
        }
        const sectionStyle = { 
            padding: '0.5rem', 
            paddingLeft: '0.5rem',
            width: '20rem', 
            backgroundColor: "rgb(70, 70, 70)", 
            float: 'left',
            height: '95%'
        }
        
        const sectionHeaderStyle = {
            width: '100%',
            backgroundColor: '#181818',
            borderBottom: 'solid 0.5px #5e5e5e',
            textAlign: 'center'
        }
        return(
            <div style={sectionStyle}>
                <div style={sectionHeaderStyle}>{'React Context'}</div>
                <div>
                    <label className="elementLbl">Enter User Name (1st)</label>
                    <br/>
                    <input 
                        type="text" 
                        className="textTypeSearch" 
                        value={this.state.userName}
                        onChange={this.onUserNameChange}/>
                </div>
                <div>
                    <UserContext.Provider value={this.state}>
                        <UserPreferenceContext.Provider value={userPreferenceContext}>
                            <UserInfo />
                        </UserPreferenceContext.Provider>
                    </UserContext.Provider>
                </div>
                <br/>
                <UserDefault />
            </div>
        )
    }
}