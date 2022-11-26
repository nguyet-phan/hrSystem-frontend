import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../../utils';
import * as actions from "../../../../store/actions";
import './UserRedux.scss';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManagerUser from './TableManagerUser';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,
            isDisplayForm: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: ''

        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //render -> didUpdate
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPoitions = this.props.positionRedux;
            this.setState({
                positionArr: arrPoitions,
                position: arrPoitions && arrPoitions.length > 0 ? arrPoitions[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux;
            let arrPoitions = this.props.positionRedux;
            let arrRoles = this.props.roleRedux;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPoitions && arrPoitions.length > 0 ? arrPoitions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: ''
            })
        }
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            // console.log('check base64 image: ', base64);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
            // console.log('check get file: ', objectUrl);
        }
    }

    openPreviewImage = () => {
        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        let action = this.state.action;

        if (action === CRUD_ACTIONS.CREATE) {
            // fire redux create action
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }

        if (action === CRUD_ACTIONS.EDIT) {
            // fire redux edit action
            this.props.editUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }

    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName',
            'phoneNumber', 'address'];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Missing input required: ' + arrCheck[i])
                break;
            }
        }

        return isValid;
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state };

        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }

        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,

            isDisplayForm: true
        }, () => {
            console.log('check base64: ', this.state);
        })
    }

    onOpenForm = () => {
        let arrGenders = this.props.genderRedux;
        let arrPoitions = this.props.positionRedux;
        let arrRoles = this.props.roleRedux;
        this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
            position: arrPoitions && arrPoitions.length > 0 ? arrPoitions[0].keyMap : '',
            role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
            avatar: '',
            action: CRUD_ACTIONS.CREATE,
            previewImgURL: '',

            isDisplayForm: true
        })
    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm: false,
        })
    }

    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;

        let language = this.props.language;
        let isGetGender = this.props.isLoadingGender;
        let { isDisplayForm } = this.state;

        let { email, password, firstName, lastName, phoneNumber,
            address, gender, position, role, avatar } = this.state;

        // console.log('check state component: ', this.state);
        return (
            <div className='user-redux-container' style={{ marginTop: '60px' }}>
                <div className='title'>
                    <FormattedMessage id='manage-user.title' />
                </div>

                <div className='user-redux-body' >
                    {/* <div className='container-fluid'> */}
                    <div className='container'>
                        {isDisplayForm ?
                            <div className='row'>

                                <div className='col-12'>
                                    {isGetGender === true ? 'Loading genders...' : ''}
                                </div>

                                <div className='col-3'>
                                    <label><FormattedMessage id='manage-user.email' /></label>
                                    <input className='form-control' type='email'
                                        value={email}
                                        onChange={(event) => { this.onChangeInput(event, 'email') }}
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                    />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='manage-user.password' /></label>
                                    <input className='form-control' type='password'
                                        value={password}
                                        onChange={(event) => { this.onChangeInput(event, 'password') }}
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                    />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='manage-user.first-name' /></label>
                                    <input className='form-control' type='text'
                                        value={firstName}
                                        onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                                    />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='manage-user.last-name' /></label>
                                    <input className='form-control' type='text'
                                        value={lastName}
                                        onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                    />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='manage-user.phone-number' /></label>
                                    <input className='form-control' type='text'
                                        value={phoneNumber}
                                        onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                    />
                                </div>
                                <div className='col-9'>
                                    <label><FormattedMessage id='manage-user.address' /></label>
                                    <input className='form-control' type='text'
                                        value={address}
                                        onChange={(event) => { this.onChangeInput(event, 'address') }}
                                    />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='manage-user.gender' /></label>
                                    <select className='form-control' value={gender}
                                        onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                    >
                                        {genders && genders.length > 0 &&
                                            genders.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }

                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='manage-user.position' /></label>
                                    <select className='form-control' value={position}
                                        onChange={(event) => { this.onChangeInput(event, 'position') }}
                                    >
                                        {positions && positions.length > 0 &&
                                            positions.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='manage-user.role' /></label>
                                    <select className='form-control' value={role}
                                        onChange={(event) => { this.onChangeInput(event, 'role') }}
                                    >
                                        {roles && roles.length > 0 &&
                                            roles.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='manage-user.image' /></label>
                                    <div className='preview-img-container'>
                                        <input id='previewImg' type='file' hidden
                                            onChange={(event) => { this.handleOnChangeImage(event) }}

                                        />
                                        <label className='label-upload' htmlFor='previewImg'>
                                            <FormattedMessage id='manage-user.upload' />
                                            <i className='fas fa-upload mx-1'></i>
                                        </label>
                                        <div className='preview-image'
                                            style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                            onClick={() => this.openPreviewImage()}
                                        ></div>
                                    </div>
                                </div>
                                <div className='col-12 my-3 text-center'>
                                    <button
                                        className='btn btn-danger mx-3 '
                                        onClick={() => this.onCloseForm()}
                                    >
                                        {/* <i className='fas fa-times-circle'></i><> </> */}
                                        <FormattedMessage id='manage-user.cancel' />
                                    </button>
                                    <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning mx-3' : 'btn btn-primary mx-3'}
                                        onClick={() => this.handleSaveUser()}
                                    >
                                        {this.state.action === CRUD_ACTIONS.EDIT ?
                                            <FormattedMessage id='manage-user.edit' /> :
                                            <FormattedMessage id='manage-user.save' />
                                        }

                                    </button>
                                </div>
                            </div>
                            :
                            <div className='col-12 mb-3 text-right'>
                                <button
                                    className='btn btn-primary px-3'
                                    onClick={() => this.onOpenForm()}
                                >
                                    <i className='fas fa-plus'></i><> </>
                                    <FormattedMessage id='manage-user.add' />
                                </button>
                            </div>
                        }
                        <hr></hr>

                        <div className='col-12 mb-5'>
                            <TableManagerUser
                                handleEditUserFromParentKey={this.handleEditUserFromParent}
                                action={this.state.action}

                            />
                        </div>
                    </div>
                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editUserRedux: (data) => dispatch(actions.editUser(data))

        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
