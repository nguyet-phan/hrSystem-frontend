import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDepartment.scss';
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../utils';

class ManageDepartment extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {

        return (
            <div className='user-info ' style={{ marginTop: '60px' }}>
                <div className='title'>
                    Thông tin cá nhân
                </div>
                <div className='container'>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-10 mt-5 pt-5'>
                            <div className='row z-depth-3'>
                                <div className='col-sm-4 bg-info rounded-left'>
                                    <div className='card-block text-center text-white'>
                                        <i className='fas fa-user-tie fa-7x mt-5'></i>
                                        <h2 className='font-weight-bold mt-4'>Admin</h2>
                                        <p>Super Admin</p>
                                        <i className='far fa-edit fa-2x mb-4'></i>
                                    </div>
                                </div>
                                <div className='col-sm-8 bg-white rounded-right'>
                                    <h3 className='mt-3 text-center'>Thông tin cá nhân</h3>
                                    <hr className='badge-primary mt-0 w-25' />
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <p className='font-weight-bold'>Họ đệm: </p>
                                            <h6 className='text-muted'>Super</h6>
                                        </div>
                                        <div className='col-sm-6'>
                                            <p className='font-weight-bold'>Tên: </p>
                                            <h6 className='text-muted'>Admin</h6>
                                        </div>
                                    </div>
                                    <h3 className='mt-3'>Thông tin tài khoản</h3>
                                    <hr className='badge-primary' />
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <p className='font-weight-bold'>Email: </p>
                                            <h6 className='text-muted'>superadmin@gmail.com</h6>
                                        </div>
                                        <div className='col-sm-6'>
                                            <p className='font-weight-bold'>Phone: </p>
                                            <h6 className='text-muted'>+84123456789</h6>
                                        </div>
                                    </div>
                                    <hr className='badge-primary' />
                                    <ul className='list-unstyled d-flex justify-content-center mt-4'>
                                        <li><a href='#'><i className='fab fa-facebook-f px-3 h4 text-info'></i></a></li>
                                        <li><a href='#'><i className='fab fa-youtube px-3 h4 text-info'></i></a></li>
                                        <li><a href='#'><i className='fab fa-twitter px-3 h4 text-info'></i></a></li>
                                    </ul>
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
        // listUsers: state.admin.users,
        // language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDepartment);
