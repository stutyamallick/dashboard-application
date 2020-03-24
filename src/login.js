import React from 'react';
import './login.css'

export default class LoginComponent extends React.Component {
  constructor(props){
    super(props);
    this.userName = React.createRef();
    this.password = React.createRef();
  }

  onLogin = (e) => {
    e.preventDefault();
    this.props.onLogin();
  }

  render() {
    return (
      <div className="login-screen-ct">
        <div className="login-form-ct">
          <div className="login-form-app-header">DASHBOARD</div>
          <br />
          <form onSubmit={this.onLogin}>
            <label className="login-field-lbl">Enter User Name</label>
            <br />
            <input type="text" className="login-field" ref={this.userName} required />
            <br />
            <label className="login-field-lbl">Enter Password</label>
            <br />
            <input type="password" className="login-field" ref={this.password} required />
            <br /> <br />
            <button className="login-form-submit-btn">SUBMIT</button>
          </form>
        </div>
      </div>
    );
  }
}