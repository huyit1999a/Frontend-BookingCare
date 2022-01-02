import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
//import * as actions from '../store/actions';
import * as actions from '../../store/actions';
import './Login.scss';
import { FormattedMessage } from 'react-intl';

class Login extends Component {
	constructor(props) {
		super(props);
		this.btnLogin = React.createRef();
	}

	render() {
		return (
			<div className="login-background">
				<div className="login-container">
					<div className="login-content row">
						<div className="col-12 text-center mt-4 my-5">
							<h2 className="login-content-title">Login</h2>
						</div>
						<div className="col-12 form-group">
							<label>Username</label>
							<input
								type="text"
								className="form-control login-content-input"
								name="username"
								placeholder="Enter your username"
							/>
						</div>
						<div className="col-12 form-group mt-2">
							<label>Password</label>
							<input
								type="password"
								className="form-control login-content-input"
								name="password"
								placeholder="Enter your password"
							/>
						</div>
						<div class="col-12 mt-2">
							<button className="login-content-btn-login">
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
						<div className="col-12 login-content-social-login d-flex justify-content-center align-items-center mt-3">
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
		adminLoginSuccess: (adminInfo) =>
			dispatch(actions.adminLoginSuccess(adminInfo)),
		adminLoginFail: () => dispatch(actions.adminLoginFail()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
