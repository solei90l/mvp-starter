import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }

  resetState() {
    this.setState({
      email: "",
      password: ""
    })
  }

  handleClick(event) {
    event.preventDefault();
    var data = {};
    for (var keys in this.state) {
      data[keys] = this.state[keys]
    }
    var that = this
    $.post("/signIn", data, function(boo){
      if (boo) {
        that.props.authenticated(that.state.email);
        that.props.redirectHome();
      } else {
        that.resetState();
      }

    })

  }

  typing(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  render () {
    return (
      <div className="form_container">
        <h3>Sign In Page</h3>
        <form action="/signIn" method="post">

          <div className='form_view'>
            <div className='form_item'>
              <label name="email">Email</label>
              <input type="text" id="email" value={this.state.email} onChange={this.typing.bind(this)}/>
            </div>
            <div className='form_item'>
              <label name="password">Password</label>
              <input type="password" id="password" value={this.state.password} onChange={this.typing.bind(this)}/>
            </div>
            <div className='form_button'>
              <button onClick={this.handleClick.bind(this)}>Sign In</button>
            </div>
          </div>
        </form>
        <span>Don't have an account? - <button onClick={this.props.redirectSignUp}>Create one!</button></span>
      </div>
    )
  }
}

export default SignInForm;