import React from 'react';
import logo from '../logo.svg';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {isloggedIn : true};
        this.handleSignOutClick = this.handleSignOutClick.bind(this);
        this.handleSignInClick = this.handleSignInClick.bind(this);
    }
    handleSignOutClick(){
        this.setState({isloggedIn : false});
    }
    handleSignInClick(){
        this.setState({isloggedIn : true})
    }

    render() {
        const isloggedIn = this.state.isloggedIn;
        let userStatus;

        if(isloggedIn){
            userStatus = <SignedIn onClick={this.handleSignOutClick}/>;
        }else{
            userStatus = <SignedOut onClick={this.handleSignInClick}/>;
        }

        return (
            <div className="rowFlex">
                <div className="flex-2 app-logoCt"><img src={logo} className="app-logo" alt="logo" /></div>
                <div className="flex-4 app-titleCt">
                    <label className="app-title">{this.props.applicationName}</label>
                </div>
                <div className="flex-2 rev-rowFlex">
                    {userStatus}
                </div>
            </div>    
        );
    }
  }

  class SignedIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {loggedInUser : "Stutya Mallick"};
    }
    render(){
        return(
            <div className="colFlex app-userDetCt">
                <div className="app-userDetText">
                     SignedIn as {this.state.loggedInUser}</div>
                <div className="app-userSignoutText rev-rowFlex" onClick={this.props.onClick}>SignOut</div>
            </div>
        );
    }
  }
  class SignedOut extends React.Component{
      
      render(){
          return(
            <div className="colFlex app-userDetCt">
                <div className="app-userDetText">You have been signed out.</div>
                <div className="app-userSignoutText rev-rowFlex" onClick={this.props.onClick}>SignIn</div>
            </div>
          );
      }
  }
  export default Header;