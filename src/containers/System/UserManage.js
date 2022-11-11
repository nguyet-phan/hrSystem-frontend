import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
        // console.log('get user from server: ', response);
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                });
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
            // console.log('respone create user: ', response)
        } catch (e) {
            console.log(e);
        }
        // console.log('check data from child: ', data);
    }

    handleDeleteUser = async (user) => {
        console.log('click delete ', user);
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode == 0) {
                await this.getAllUsersFromReact();
            } else {
                alert(res.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleEditUser = (user) => {
        console.log('click edit', user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
        })
    }

    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })

                this.getAllUsersFromReact()
            } else {
                alert(res.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        // console.log('check render ', this.state);
        let arrUsers = this.state.arrUsers;
        // properties; nested
        return (
            <div className='users-continer'>
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleModal={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleModal={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className='title text-center'>Manage users</div>
                <div>
                    <button
                        className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}
                    ><i className='fas fa-plus'></i> Add a new user</button>
                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>

                            {arrUsers && arrUsers.map((item, index) => {
                                // console.log('front check map', item, index);
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => { this.handleEditUser(item) }}>
                                                <i className='fas fa-pencil-alt'></i>
                                            </button>
                                            <button className='btn-delete' onClick={() => { this.handleDeleteUser(item) }}>
                                                <i className='fas fa-trash'></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })

                            }
                        </tbody>


                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
