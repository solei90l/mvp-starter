import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    }
  }

  resetState() {
    this.setState({
      name: "",
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
    $.post("/signUp", data, function(){
      that.props.redirectSignIn();
      that.resetState();
    })

  }

  typing(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  render () {
    return (
      <div className="form_container">
        <h3>Sign Up Page</h3>
        <form action="/signUp" method="post">

          <div className='form_view'>
            <div className='form_item'>
              <label name="name">Name</label>
              <input type="text" id="name" value={this.state.name} onChange={this.typing.bind(this)}/>
            </div>
            <div className='form_item'>
              <label name="email">Email</label>
              <input type="text" id="email" value={this.state.email} onChange={this.typing.bind(this)}/>
            </div>
            <div className='form_item'>
              <label name="password">Password</label>
              <input type="password" id="password" value={this.state.password} onChange={this.typing.bind(this)}/>
            </div>
            <div className='form_button'>
              <button onClick={this.handleClick.bind(this)}>Create your account!</button>
            </div>
          </div>

        </form>
        <span>Already have an account? - <button onClick={this.props.redirectSignIn}>Sign In!</button></span>
      </div>
    )
  }
}

export default SignUpForm;
