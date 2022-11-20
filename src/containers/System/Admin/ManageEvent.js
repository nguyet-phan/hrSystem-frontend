import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageEvent.scss';
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class ManageEvent extends Component {

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
            <div className='manage-event-container container'>
                <div className='title'>
                    Quản lý sự kiện
                </div>
                <div className='form-manage-event form-group'>
                    <div className='title-event '>
                        <label>Tên sự kiện</label>
                        <input className='form-control' type='text'
                            placeholder='Nhập tên sự kiện'
                        />
                    </div>
                    <div className='start-date'>
                        <label className='title-detail'>Ngày bắt đầu</label>
                        <DatePicker className='form-control' placeholderText='Chọn ngày bắt đầu'
                        />
                    </div>
                    <div className='end-date'>
                        <label className='title-detail'>Ngày kết thúc</label>
                        <DatePicker className='form-control' placeholderText='Chọn ngày kết thúc'
                        />
                    </div>

                </div>
                <button className='btn btn-primary px-3'>
                    <i className='fas fa-plus'></i> Lưu
                </button>
                <hr></hr>

                <table className='list-events'>
                    <thead>
                        <tr>
                            <th>Sự kiện</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Vacation</td>
                            <td>07/11/2022</td>
                            <td>10/11/2022</td>
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
                        <tr>
                            <td>Conference</td>
                            <td>20/11/2022</td>
                            <td>23/11/2022</td>
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

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageEvent);
