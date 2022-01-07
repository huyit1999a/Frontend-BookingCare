import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {
	getAllUsers,
	createNewUserService,
	deleteUserService,
} from '../../services/userService';
import { emitter } from '../../utils/emitter';
import ModalUser from './ModalUser';

class UserManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrUsers: [],
			isOpenModalUser: false,
		};
	}

	async componentDidMount() {
		await this.getAllUsers();
	}

	handleAddNewUser = () => {
		this.setState({
			isOpenModalUser: true,
		});
	};

	getAllUsers = async () => {
		let response = await getAllUsers('ALL');
		if (response && response.errCode === 0) {
			this.setState({
				arrUsers: response.users,
			});
		}
	};

	toggleUserModal = () => {
		this.setState({
			isOpenModalUser: !this.state.isOpenModalUser,
		});
	};

	createNewUser = async (data) => {
		try {
			let response = await createNewUserService(data);
			if (response && response.errCode !== 0) {
				alert(response.errMessage);
			} else {
				await this.getAllUsers();
				this.setState({
					isOpenModalUser: false,
				});

				emitter.emit('EVENT_CLEAR_MODAL_DATA');
			}
		} catch (err) {
			console.log(err);
		}
	};

	handleDeleteUser = async (user) => {
		try {
			let response = await deleteUserService(user.id);
			if (response && response.errCode === 0) {
				await this.getAllUsers();
			} else {
				alert(response.errMessage);
			}
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		let arrUsers = this.state.arrUsers;
		return (
			<div className="users-container">
				<ModalUser
					isOpen={this.state.isOpenModalUser}
					toggleFromParent={this.toggleUserModal}
					createNewUser={this.createNewUser}
				/>
				<div className="title text-center">Manage users</div>
				<div className="mx-1">
					<button
						className="btn btn-primary px-3"
						onClick={() => this.handleAddNewUser()}
					>
						<i className="fas fa-plus"></i> Add new user
					</button>
				</div>
				<div className="users-table mt-3 mx-1">
					<table id="users">
						<thead>
							<tr>
								<th>Email</th>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Address</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{arrUsers &&
								arrUsers.map((item, index) => {
									return (
										<tr key={index}>
											<td>{item.email}</td>
											<td>{item.firstName}</td>
											<td>{item.lastName}</td>
											<td>{item.address}</td>
											<td>
												<button className="btn-edit">
													<i className="fas fa-pencil-alt"></i>
												</button>
												<button
													className="btn-delete"
													onClick={() => {
														this.handleDeleteUser(
															item
														);
													}}
												>
													<i className="fas fa-trash"></i>
												</button>
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
