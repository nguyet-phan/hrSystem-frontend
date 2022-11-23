import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagerUser.scss';
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../utils';

class TableManagerUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user);
    }

    render() {
        // console.log('check all users redux: ', this.props.listUsers);
        // console.log('check all state: ', this.state.usersRedux);
        let arrUsers = this.state.usersRedux;
        let language = this.props.language;

        return (
            <table id='TableManagerUser'>
                <tbody>
                    <tr>
                        <th><FormattedMessage id='manage-user.userId' /></th>
                        <th><FormattedMessage id='manage-user.email' /></th>
                        <th><FormattedMessage id='manage-user.last-name' /></th>
                        <th><FormattedMessage id='manage-user.first-name' /></th>
                        {/* <th><FormattedMessage id='manage-user.phone-number' /></th> */}
                        <th><FormattedMessage id='manage-user.position' /></th>
                        <th><FormattedMessage id='manage-user.role' /></th>
                        <th><FormattedMessage id='manage-user.actions' /></th>
                    </tr>

                    {arrUsers && arrUsers.length > 0 &&
                        arrUsers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.firstName}</td>
                                    {/* <td>{item.phoneNumber}</td> */}
                                    <td>{language === LANGUAGES.VI ? item.positionData.valueVi : item.positionData.valueEn}</td>
                                    <td>{language === LANGUAGES.VI ? item.roleData.valueVi : item.roleData.valueEn}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditUser(item)}>
                                            <i className='fas fa-pencil-alt'></i>
                                        </button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteUser(item)}>
                                            <i className='fas fa-trash'></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerUser);
