import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    showSubmitError: '',
    errorMsg: '',
  }

  onChangeUserId = event => {
    this.setState({
      userId: event.target.value,
    })
  }

  onChangePIN = event => {
    this.setState({
      pin: event.target.value,
    })
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onClickLogin = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const updatedDetails = {
      user_id: userId,
      pin,
    }
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(updatedDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {errorMsg, showSubmitError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-container">
        <div className="login-card-container">
          <div className="image-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="login-image"
            />
          </div>
          <div className="form-container">
            <h1 className="main-heading">Welcome Back!</h1>
            <form className="form-style" onSubmit={this.onClickLogin}>
              <label htmlFor="userId" className="label-style">
                User ID
              </label>
              <input
                type="text"
                id="userId"
                className="input-element-style"
                placeholder="Enter User ID"
                onChange={this.onChangeUserId}
              />
              <label htmlFor="pin" className="label-style">
                PIN
              </label>
              <input
                type="password"
                id="pin"
                className="input-element-style"
                placeholder="Enter PIN"
                onChange={this.onChangePIN}
              />
              <button type="submit" className="login-button">
                Login
              </button>
              <p className="error-msg">{showSubmitError ? errorMsg : ''}</p>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
