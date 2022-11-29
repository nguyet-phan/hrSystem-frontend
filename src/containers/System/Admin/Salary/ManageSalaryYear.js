import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageSalaryYear.scss';
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import DatePicker from '../../../../components/Input/DatePicker';
import moment from 'moment';

class ManageSalaryYear extends Component {

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
        let arrYear = [2021, 2022];
        for (let i = 0; i < 5; i++) {
            let object = {};
            object.label = moment(new Date()).add(i, 'months').format('MM/YYYY');
            // object.value = moment(new Date()).add(i, 'months').startOf('month').valueOf;
            object.value = moment(new Date()).add(i, 'months').format('MM/YYYY');

            arrYear.push(object);
        }
        return (
            <div className='manage-salary-year '>
                <div className='container-fluid' >
                    <div className='title'>
                        Bảng lương năm
                    </div>
                    <div className='manage-salary-year-body'>
                        <div className='month-salary'>
                            {/* <div className='title-detail'><FormattedMessage id='manage-salary.month' /></div> */}
                            <Select
                                name={'selectedYear'}
                                // value={this.state.selectedMonth}
                                // onChange={this.handleChangeSelect}
                                options={arrYear}
                                placeholder='Chọn năm'
                            />
                        </div>
                        <hr></hr>

                        <div className='total-salary-year'>

                            <table className='month-table'>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Năm</th>
                                        <th>Tháng</th>
                                        <th>Tổng lương</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>2022</td>
                                        <td>1</td>
                                        <td>20000000</td>
                                        <td>Xem chi tiết</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>2022</td>
                                        <td>2</td>
                                        <td>20000000</td>
                                        <td>Xem chi tiết</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>2022</td>
                                        <td>3</td>
                                        <td>20000000</td>
                                        <td>Xem chi tiết</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>2022</td>
                                        <td>4</td>
                                        <td>20000000</td>
                                        <td>Xem chi tiết</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>2022</td>
                                        <td>5</td>
                                        <td>20000000</td>
                                        <td>Xem chi tiết</td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>2022</td>
                                        <td>6</td>
                                        <td>20000000</td>
                                        <td>Xem chi tiết</td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>2022</td>
                                        <td>7</td>
                                        <td>20000000</td>
                                        <td>Xem chi tiết</td>
                                    </tr>
                                    <tr>
                                        <td>8</td>
                                        <td>2022</td>
                                        <td>8</td>
                                        <td>20000000</td>
                                        <td>Xem chi tiết</td>
                                    </tr>
                                    <tr>
                                        <td>9</td>
                                        <td>2022</td>
                                        <td>9</td>
                                        <td>20000000</td>
                                        <td>Xem chi tiết</td>
                                    </tr>
                                    <tr>
                                        <td>10</td>
                                        <td>2022</td>
                                        <td>10</td>
                                        <td>20000000</td>
                                        <td>Xem chi tiết</td>
                                    </tr>
                                    <tr>
                                        <td>11</td>
                                        <td>2022</td>
                                        <td>11</td>
                                        <td>20000000</td>
                                        <td>Xem chi tiết</td>
                                    </tr>
                                    <tr>
                                        <td>12</td>
                                        <td>2022</td>
                                        <td>12</td>
                                        <td>20000000</td>
                                        <td>Xem chi tiết</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        // userInfo: state.user.userInfo,
        // language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSalaryYear);
