import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
//import * as actions from '../store/actions';
import * as actions from '../../store/actions';
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			isShowPassword: false,
			errMessage: '',
		};
	}

	handleOnChangeUsername = (event) => {
		this.setState({
			username: event.target.value,
		});
	};

	handleOnChangePassword = (event) => {
		this.setState({
			password: event.target.value,
		});
	};

	handleLogin = async () => {
		this.setState({
			errMessage: '',
		});
		try {
			let data = await handleLoginApi(
				this.state.username,
				this.state.password
			);
			if (data && data.errCode !== 0) {
				this.setState({
					errMessage: data.message,
				});
			}
			if (data && data.errCode === 0) {
				this.props.userLoginSuccess(data.user);
				console.log('login success');
			}
		} catch (err) {
			if (err.response) {
				if (err.response.data) {
					this.setState({
						errMessage: err.response.data.message,
					});
				}
			}
		}
	};

	handleShowHidePassword = () => {
		this.setState({
			isShowPassword: !this.state.isShowPassword,
		});
	};

	render() {
		return (
			<div className="login-background d-flex align-items-center justify-content-center">
				<div className="login-container mx-3">
					<div className="login-content row">
						<div className="col-12 text-center mt-3 my-4">
							<h2 className="login-content-title">Login</h2>
						</div>
						<div className="col-12 form-group">
							<label>Username</label>
							<input
								type="text"
								className="form-control login-content-input"
								name="username"
								placeholder="Enter your username"
								value={this.state.username}
								onChange={(event) => {
									this.handleOnChangeUsername(event);
								}}
							/>
						</div>
						<div className="col-12 form-group mt-2">
							<label>Password</label>
							<div className="custom-input-password">
								<input
									type={
										this.state.isShowPassword
											? 'text'
											: 'password'
									}
									className="form-control login-content-input"
									name="password"
									placeholder="Enter your password"
									onChange={(event) => {
										this.handleOnChangePassword(event);
									}}
								/>
								<span
									onClick={() => {
										this.handleShowHidePassword();
									}}
								>
									<i
										className={
											this.state.isShowPassword
												? 'far fa-eye input-eye'
												: 'far fa-eye-slash input-eye'
										}
									></i>
								</span>
							</div>
						</div>
						<div className="col-12" style={{ color: 'red' }}>
							{this.state.errMessage}
						</div>
						<div className="col-12 mt-2">
							<button
								className="login-content-btn-login"
								onClick={() => {
									this.handleLogin();
								}}
							>
								Login
							</button>
						</div>
						<div className="col-12 text-right">
							<span className="login-content-forgot-password">
								Forgot your password?
							</span>
						</div>
						<div className="col-12 text-center mt-4">
							<span className="login-content-text-other-login">
								Or Login with:
							</span>
						</div>
						<div className="col-12 login-content-social-login d-flex justify-content-center align-items-center mt-3 mb-5">
							<i className="fab fa-google-plus-g google d-flex justify-content-center align-items-center mr-5"></i>
							<i className="fab fa-facebook-f facebook d-flex justify-content-center align-items-center"></i>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		navigate: (path) => dispatch(push(path)),
		//userLoginFail: () => dispatch(actions.userLoginFail()),
		userLoginSuccess: (userInfo) =>
			dispatch(actions.userLoginSuccess(userInfo)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
