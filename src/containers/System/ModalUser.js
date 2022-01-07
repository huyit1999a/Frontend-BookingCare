import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			address: '',
		};

		this.listenToEmitter();
	}

	listenToEmitter() {
		emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
			//reset state
			this.setState({
				email: '',
				password: '',
				firstName: '',
				lastName: '',
				address: '',
			});
		});
	}

	componentDidMount() {}

	toggle = () => {
		this.props.toggleFromParent();
	};

	handleOnChangeInput = (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;
		this.setState({
			...copyState,
		});
	};

	checkValidate = () => {
		let isValid = true;
		let arrInput = [
			'email',
			'password',
			'firstName',
			'lastName',
			'address',
		];
		for (let i = 0; i < arrInput.length; i++) {
			if (!this.state[arrInput[i]]) {
				isValid = false;
				alert('Missing parameters: ' + arrInput[i]);
				break;
			}
		}
		return isValid;
	};

	handleAddNewUser = () => {
		let isValid = this.checkValidate();
		if (isValid === true) {
			this.props.createNewUser(this.state);
		}
	};

	render() {
		return (
			<Modal
				isOpen={this.props.isOpen}
				toggle={() => {
					this.toggle();
				}}
				className={'modal-user-container'}
				size="lg"
				centered
			>
				<ModalHeader
					toggle={() => {
						this.toggle();
					}}
				>
					Create a new user
				</ModalHeader>

				<ModalBody>
					<div className="modal-user-body">
						<div className="input-container form-group">
							<label>Email</label>
							<input
								type="email"
								onChange={(event) => {
									this.handleOnChangeInput(event, 'email');
								}}
								value={this.state.email}
							/>
						</div>
						<div className="input-container form-group">
							<label>Password</label>
							<input
								type="password"
								onChange={(event) => {
									this.handleOnChangeInput(event, 'password');
								}}
								value={this.state.password}
							/>
						</div>
						<div className="input-container form-group">
							<label>First name</label>
							<input
								type="text"
								onChange={(event) => {
									this.handleOnChangeInput(
										event,
										'firstName'
									);
								}}
								value={this.state.firstName}
							/>
						</div>
						<div className="input-container form-group">
							<label>Last name</label>
							<input
								type="text"
								onChange={(event) => {
									this.handleOnChangeInput(event, 'lastName');
								}}
								value={this.state.lastName}
							/>
						</div>
						<div className="input-container max-width-input form-group">
							<label>Address</label>
							<input
								type="text"
								onChange={(event) => {
									this.handleOnChangeInput(event, 'address');
								}}
								value={this.state.address}
							/>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button
						color="primary px-3"
						onClick={() => {
							this.handleAddNewUser();
						}}
					>
						Add User
					</Button>
					<Button
						color="secondary px-3"
						onClick={() => {
							this.toggle();
						}}
					>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
