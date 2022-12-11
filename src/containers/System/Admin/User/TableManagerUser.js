import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagerUser.scss';
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../utils';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

class TableManagerUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
            search: ''
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
        // console.log("check deleteUser: ", user.id);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user);
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state };

        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }


    render() {
        // console.log('check all users redux: ', this.props.listUsers);
        // console.log('check all state: ', this.state.usersRedux);
        let arrUsers = this.state.usersRedux;
        let language = this.props.language;
        let searchUser = this.state.search;

        return (
            <>
                <div className='search-box'>
                    <Form>
                        <InputGroup className='my-3'>
                            <label className='search-title mr-3 pt-1'><FormattedMessage id='manage-user.search' /> </label>
                            <Form.Control
                                placeholder='...'
                                value={searchUser}
                                onChange={(event) => this.onChangeInput(event, 'search')}
                            />
                        </InputGroup>
                    </Form>
                </div>
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
                            arrUsers.filter((item) => {
                                return searchUser.toLowerCase() === ''
                                    ? item
                                    : item.firstName.toLowerCase().includes(searchUser);
                            }).map((item, index) => {
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
            </>
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
