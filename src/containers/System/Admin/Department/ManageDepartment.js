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
            <div className='container' style={{ marginTop: '60px' }}>
                <div className='title'>
                    Quản lý phòng ban
                </div>
                <div className='form-manage-department form-group'>
                    <div className='department-name '>
                        <label>Tên phòng ban</label>
                        <input className='form-control' type='text'
                            placeholder='Nhập tiêu đề'
                        />
                    </div>
                    <div className='description'>
                        <label className='title-detail'>Mô tả</label>
                        <input className='form-control' placeholderText='Chọn ngày'
                        />
                    </div>

                </div>
                <button
                    className='btn btn-primary px-3'
                >
                    <i className='fas fa-plus'></i> Lưu
                </button>
                <hr></hr>

                <table className='list-departments'>
                    <thead>
                        <tr>
                            <th>Phòng ban</th>
                            <th>Quản lý</th>
                            <th>Mô tả</th>
                            <th>Số lượng nhân viên</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>IT</td>
                            <td>Admin</td>
                            <td>Công nghệ thông tin</td>
                            <td>50</td>
                            <td>
                                <button className='btn-edit'
                                // onClick={() => this.handleEditUser(item)}
                                ><i className='fas fa-pencil-alt'></i>
                                </button>
                                <button className='btn-delete'
                                // onClick={() => this.handleDeleteUser(item)}
                                ><i className='fas fa-trash'></i>
                                </button>
                            </td>
                        </tr>

                    </tbody>
                </table>
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
