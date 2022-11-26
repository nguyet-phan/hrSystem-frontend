import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageSalary.scss';
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../utils';

import Select from 'react-select';
import DatePicker from '../../../../components/Input/DatePicker';
import moment from 'moment';

class ManageSalary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStaff: '',
            selectedMonth: '',
            basicSalary: '',
            deductionSalary: ''
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();

    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName} - ${item.id}`;
                let labelEn = `${item.firstName} ${item.lastName} - ${item.id}`;

                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object)
            })
        }

        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            let dataSelect = this.buildDataInputSelect(this.props.listUsers)
            this.setState({
                listUsers: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.listUsers)
            this.setState({
                listUsers: dataSelect
            })
        }
    }

    handleSaveDetailSalary = () => {
        // console.log('check state detail salary: ', this.state);
        this.props.saveBasicSalaries({
            staffId: this.state.selectedStaff.value,
            month: this.state.selectedMonth.value,
            basicSalary: this.state.basicSalary,
            deductionSalary: this.state.deductionSalary,
        })
    }

    handleChangeStaff = (selectedStaff) => {
        this.setState({
            selectedStaff,

        });
    };
    handleChangeMonth = (selectedMonth) => {
        this.setState({
            selectedMonth
        });
    };

    onChangeInput = (event, id) => {
        let copyState = { ...this.state };

        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
    }


    render() {
        console.log('check bonussalary state: ', this.state);

        // console.log('moment month: ', moment(new Date()).format('MM/YYYY'));
        let arrMonth = [];
        for (let i = 0; i < 5; i++) {
            let object = {};
            object.label = moment(new Date()).add(i, 'months').format('MM/YYYY');
            // object.value = moment(new Date()).add(i, 'months').startOf('month').valueOf;
            object.value = moment(new Date()).add(i, 'months').format('MM/YYYY');

            arrMonth.push(object);
        }
        let { basicSalary, deductionSalary } = this.state;
        return (
            <div className='manage-salary-container container'>
                <div className='title'>
                    <FormattedMessage id='manage-salary.title' />
                </div>

                <div className='infor'>
                    <div className='select-staff'>
                        <div className='title-detail'>Nhân sự</div>
                        <Select
                            value={this.state.selectedStaff}
                            onChange={this.handleChangeStaff}
                            options={this.state.listUsers}
                            placeholder='Chọn nhân sự'
                        />
                    </div>

                    <div className='month-salary'>
                        <div className='title-detail'>Tháng</div>
                        <Select
                            value={this.state.selectedMonth}
                            onChange={this.handleChangeMonth}
                            options={arrMonth}
                            placeholder='Chọn tháng'
                        />
                    </div>
                </div>
                <hr></hr>

                <div className='basic-deduction'>
                    <div className='basic-salary'>
                        <div className='title-detail'>Lương cơ bản</div>
                        <div className='basic-salary-detail'>
                            <label> Số tiền (VND)</label>
                            <input className='form-control' type="text"
                                value={basicSalary}
                                onChange={(event) => { this.onChangeInput(event, 'basicSalary') }}
                            />
                        </div>
                    </div>
                    <div className='deduction-salary'>
                        <div className='title-detail'>Lương khấu trừ</div>
                        <div className='deduction-salary-detail'>
                            <label> Số ngày nghỉ</label>
                            <input className='form-control' type="text" placeholder="0"
                                value={deductionSalary}
                                onChange={(event) => { this.onChangeInput(event, 'deductionSalary') }}
                            />
                        </div>
                    </div>
                </div>

                <div className='bonus-project'>
                    {/* <div className='bonus-salary form-group'>
                        <div className='title-detail'>
                            <FormattedMessage id='manage-salary.bonus-salary' />
                            <button className='btn-add'>
                                <i className='fas fa-plus'></i>
                            </button>
                        </div>
                        <TableBonusSalary
                            staffId={this.state.selectedStaff && this.state.selectedStaff.value ? this.state.selectedStaff.value : -1}
                            month={this.state.selectedMonth && this.state.selectedMonth.value ? this.state.selectedMonth.value : moment(new Date()).format('MM/YYYY')}
                        />
                    </div> */}

                    <div className='bonus-salary form-group'>
                        <div className='title-detail'>
                            Lương thưởng
                        </div>

                        <div className='bonus-salary-detail'>
                            <div className='left'>
                                <label> Lý do thưởng</label>
                                <input className='form-control' type="text" />
                            </div>
                            <div className='right'>
                                <label> Số tiền (VND)</label>
                                <input className='form-control' type="text" />
                            </div>
                        </div>

                    </div>

                    <div className='project-salary form-group'>
                        <div className='title-detail'>
                            Lương dự án
                        </div>

                        <div className='project-salary-detail'>
                            <div className='left'>
                                <label> Dự án</label>
                                <input className='form-control' type="text" />
                            </div>
                            <div className='right'>
                                <label> Số tiền (VND)</label>
                                <input className='form-control' type="text" />
                            </div>
                        </div>

                    </div>

                </div>

                <div className='onsite-overtime'>

                    <div className='onsite-salary form-group'>
                        <div className='title-detail'>
                            Lương onsite
                        </div>

                        <div className='onsite-salary-detail'>
                            <div className='left'>
                                <label> Địa điểm onsite </label>
                                <input className='form-control' type="text" />
                            </div>
                            <div className='middle'>
                                <label> Từ ngày </label>
                                <input className='form-control' type="date" />
                            </div>
                            <div className='right'>
                                <label> Đến ngày</label>
                                <input className='form-control' type="date" />
                            </div>
                        </div>

                    </div>

                    <div className='overtime-salary form-group'>
                        <div className='title-detail'>
                            Lương overtime
                            <button className='btn-add'>
                                <i className='fas fa-plus'></i>
                            </button>
                        </div>
                        <div className='overtime-salary-detail'>
                            <div className='left'>
                                <label> Ngày</label>
                                <input className='form-control' type="text" />
                            </div>
                            <div className='right'>
                                <label> Số giờ</label>
                                <input className='form-control' type="text" />
                            </div>
                        </div>

                    </div>
                </div>
                <hr></hr>

                <div className='total-salary'>
                    <div className='title-detail'>
                        Tổng lương
                    </div>
                    <table className='detail-salary'>
                        <thead>
                            <tr>
                                <th>Nhân viên</th>
                                <th>Tháng</th>
                                <th>Lương cơ bản</th>
                                <th>Lương dự án</th>
                                <th>Lương thưởng</th>
                                <th>Lương overtime</th>
                                <th>Lương onsite</th>
                                <th>Khấu trừ</th>
                                <th>Tổng lương</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Phan Nguyệt</td>
                                <td>11/2022</td>
                                <td>5000000</td>
                                <td>500000</td>
                                <td>200000</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <hr></hr>

                <button className='btn btn-warning m-3'
                    onClick={() => this.handleSaveDetailSalary()}
                >
                    {/* <FormattedMessage id='manage-user.save' /> */}
                    Lưu thông tin lương
                </button>
            </div>
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
        saveBasicSalaries: (data) => dispatch(actions.saveBasicSalaries(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSalary);
