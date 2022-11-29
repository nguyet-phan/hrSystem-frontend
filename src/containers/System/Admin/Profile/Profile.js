import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Profile.scss';
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../utils';
import avatar from '../../../../assets/images/user.svg';
import { getAllUsers } from '../../../../services/userService';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        // imageBase64 = new Buffer(user.image, 'base64').toString('binary');

    }

    render() {
        // console.log('check props: ', this.props.userInfo);
        let { language, userInfo } = this.props;
        console.log('check user id: ', this.props)
        let imageBase64 = '';
        if (userInfo.image) {
            imageBase64 = new Buffer(userInfo.image, 'base64').toString('binary');
        }
        console.log('check imageBase64: ', imageBase64);
        return (
            <div className='user-info '>
                <div className='container'>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-10 mt-5 pt-5'>
                            <div className='row z-depth-3'>
                                <div className='col-sm-4 bg-info rounded-left'>
                                    <div className='card-block text-center text-white'>
                                        <i className='fas fa-user-tie fa-7x mt-5'></i>

                                        <h2 className='font-weight-bold mt-4'>
                                            {userInfo && userInfo.firstName ? userInfo.firstName : ''}
                                        </h2>
                                        <h4>
                                            {language === LANGUAGES.VI ? userInfo.positionData.valueVi : userInfo.positionData.valueEn}

                                        </h4>
                                        <i className='far fa-edit fa-2x mb-4'></i>
                                    </div>
                                </div>
                                <div className='col-sm-8 bg-white rounded-right'>

                                    <h3 className='mt-3'>
                                        <FormattedMessage id='manage-user.profile' />
                                    </h3>
                                    <hr className='badge-primary' />
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <p className='font-weight-bold'>
                                                <FormattedMessage id='manage-user.email' />
                                            </p>
                                            <h6 className='text-muted'>
                                                {userInfo && userInfo.email ? userInfo.email : ''}
                                            </h6>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-sm-6'>
                                            <p className='font-weight-bold'>
                                                <FormattedMessage id='manage-user.last-name' />
                                            </p>
                                            <h6 className='text-muted'>
                                                {userInfo && userInfo.lastName ? userInfo.lastName : ''}
                                            </h6>
                                        </div>
                                        <div className='col-sm-6'>
                                            <p className='font-weight-bold'>
                                                <FormattedMessage id='manage-user.first-name' />
                                            </p>
                                            <h6 className='text-muted'>
                                                {userInfo && userInfo.firstName ? userInfo.firstName : ''}
                                            </h6>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-sm-6'>
                                            <p className='font-weight-bold'>
                                                <FormattedMessage id='manage-user.phone-number' />
                                            </p>
                                            <h6 className='text-muted'>
                                                {userInfo && userInfo.phoneNumber ? userInfo.phoneNumber : ''}
                                            </h6>
                                        </div>
                                        <div className='col-sm-6'>
                                            <p className='font-weight-bold'>
                                                <FormattedMessage id='manage-user.gender' />
                                            </p>
                                            <h6 className='text-muted'>
                                                {language === LANGUAGES.VI ? userInfo.genderData.valueVi : userInfo.genderData.valueEn}
                                            </h6>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <p className='font-weight-bold'>
                                                <FormattedMessage id='manage-user.address' />
                                            </p>
                                            <h6 className='text-muted'>
                                                {userInfo && userInfo.address ? userInfo.address : ''}
                                            </h6>
                                        </div>
                                    </div>

                                    <h3 className='mt-3'>
                                        <FormattedMessage id='manage-user.info-position' />
                                    </h3>
                                    <hr className='badge-primary' />
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <p className='font-weight-bold'>
                                                <FormattedMessage id='manage-user.position' />
                                            </p>
                                            <h6 className='text-muted'>{language === LANGUAGES.VI ? userInfo.positionData.valueVi : userInfo.positionData.valueEn}</h6>
                                        </div>
                                        <div className='col-sm-6 mb-3'>
                                            <p className='font-weight-bold'>
                                                <FormattedMessage id='manage-user.role' />
                                            </p>
                                            <h6 className='text-muted'>{language === LANGUAGES.VI ? userInfo.roleData.valueVi : userInfo.roleData.valueEn}</h6>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
