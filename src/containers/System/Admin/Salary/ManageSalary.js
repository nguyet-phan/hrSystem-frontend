import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageSalary.scss';
import * as actions from "../../../../store/actions";
import { LANGUAGES, dateFormat } from '../../../../utils';

import Select from 'react-select';
import DatePicker from '../../../../components/Input/DatePicker';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import {
    getBasicSalaryByIdService, getDeductionSalaryByIdService, getBonusSalaryByIdService,
    getProjectSalaryByIdService, getOvertimeSalaryByIdService, getOnsiteSalaryByIdService,
    confirmSalaryService
} from '../../../../services/userService';
import { toast } from 'react-toastify';

class ManageSalary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStaff: '',
            selectedMonth: '',
            basicSalary: '',
            deductionSalary: '',
            reason: '',
            bonusSalary: '',
            projectName: '',
            projectSalary: '',
            onsitePlace: '',
            startDay: '',
            endDay: '',
            overtimeHours: '',

            statusId: ''
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
        this.props.saveBasicSalaries({
            staffId: this.state.selectedStaff.value,
            month: this.state.selectedMonth.value,
            basicSalary: this.state.basicSalary,
            deductionSalary: this.state.deductionSalary,

            reason: this.state.reason,
            bonusSalary: this.state.bonusSalary,
            projectName: this.state.projectName,
            projectSalary: this.state.projectSalary,
            onsitePlace: this.state.onsitePlace,
            startDay: this.state.startDay,
            endDay: this.state.endDay,
            overtimeHours: this.state.overtimeHours
        })
    }

    handleConfirmSalary = async () => {
        let dataConfirm = this.state;
        let res = await confirmSalaryService({
            staffId: dataConfirm.selectedStaff.value,
            month: dataConfirm.selectedMonth.value,
            basicSalary: dataConfirm.basicSalary
        });
        if (res && res.errCode === 0) {
            // toast.success('Xác nhận bảng lương thành công!/ Confirm the payroll succeed!');
        } else {
            toast.error(res.errMessage)
            // toast.error('Xác nhận bảng lương thất bại!/ Confirm the payroll failed!')
        }
        this.setState({
            statusId: 'S2'
        })
        // console.log('check confirm salary: ', this.state);

    }

    handleChangeSelect = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
        // console.log('check select: ', selectedOption, stateName);
        let staffId = '', month = '';
        if (stateName === 'selectedStaff') {
            staffId = selectedOption.value;
            month = this.state.selectedMonth.value;
        } else {
            staffId = this.state.selectedStaff.value;
            month = selectedOption.value;
        }
        // console.log('check staff, month: ', staffId, month);
        let resBasic = await getBasicSalaryByIdService(staffId, month);
        if (resBasic && resBasic.errCode === 0 && resBasic.data && resBasic.data.basicSalaries) {
            this.setState({
                basicSalary: resBasic.data.basicSalaries,
                statusId: resBasic.data.statusId
            })
        }
        else {
            this.setState({
                basicSalary: '',
            })
        }
        // console.log('check getBasicSalaryByIdService resBasic: ', resBasic);
        // console.log('check getBasicSalaryByIdService basicSalary: ', resBasic.data.basicSalaries);

        let resDeduction = await getDeductionSalaryByIdService(staffId, month);
        if (resDeduction && resDeduction.errCode === 0 && resDeduction.data && resDeduction.data.quantity) {
            this.setState({
                deductionSalary: resDeduction.data.quantity,
            })
        }
        else {
            this.setState({
                deductionSalary: '',
            })
        }

        // console.log('check getBasicSalaryByIdService resBasic: ', resDeduction);
        // console.log('check getBasicSalaryByIdService basicSalary: ', resDeduction.data.quantity);

        let resBonus = await getBonusSalaryByIdService(staffId, month);
        if (resBonus && resBonus.errCode === 0 && resBonus.data && resBonus.data.salary) {
            this.setState({
                reason: resBonus.data.reason,
                bonusSalary: resBonus.data.salary,
            })
        }
        else {
            this.setState({
                reason: '',
                bonusSalary: '',
            })
        }

        // console.log('check getBasicSalaryByIdService resBasic: ', resBonus);
        // console.log('check getBasicSalaryByIdService basicSalary: ', resBonus.data.salary);

        let resProject = await getProjectSalaryByIdService(staffId, month);
        if (resProject && resProject.errCode === 0 && resProject.data && resProject.data.salary) {
            this.setState({
                projectName: resProject.data.projectName,
                projectSalary: resProject.data.salary,
            })
        }
        else {
            this.setState({
                projectName: '',
                projectSalary: '',
            })
        }

        // console.log('check getBasicSalaryByIdService resBasic: ', resProject);
        // console.log('check getBasicSalaryByIdService basicSalary: ', resProject.data.salary);

        let resOnsite = await getOnsiteSalaryByIdService(staffId, month);
        if (resOnsite && resOnsite.errCode === 0 && resOnsite.data && resOnsite.data.place) {
            this.setState({
                onsitePlace: resOnsite.data.place,
                startDay: moment(resOnsite.data.startDay).format(dateFormat.CLIENT_VIEW),
                endDay: moment(resOnsite.data.endDay).format(dateFormat.CLIENT_VIEW),
            })
        }
        else {
            this.setState({
                onsitePlace: '',
                startDay: '',
                endDay: '',
            })
        }

        // console.log('check getBasicSalaryByIdService resBasic: ', resOnsite);
        // console.log('check getBasicSalaryByIdService basicSalary: ', resOnsite.data.place);

        let resOvertime = await getOvertimeSalaryByIdService(staffId, month);
        if (resOvertime && resOvertime.errCode === 0 && resOvertime.data && resOvertime.data.hour) {
            this.setState({
                overtimeHours: resOvertime.data.hour,
            })
        }
        else {
            this.setState({
                overtimeHours: '',
            })
        }

        // console.log('check getBasicSalaryByIdService resBasic: ', resOvertime);
        // console.log('check getBasicSalaryByIdService basicSalary: ', resOvertime.data.hour);
    };

    onChangeInput = (event, id) => {
        let copyState = { ...this.state };

        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
    }

    onChangeStartDay = (date) => {
        this.setState({
            startDay: date[0],
        })
    }
    onChangeEndDay = (date) => {
        this.setState({
            endDay: date[0],
        })
    }

    render() {
        console.log('check salary state: ', this.state);
        let arrMonth = [];
        arrMonth.push({ 'label': '11/2022', 'value': '11/2022' });
        for (let i = 0; i < 2; i++) {
            let object = {};
            let monthStart = 11
            object.label = moment(new Date()).add(i, 'months').format('MM/YYYY');
            // object.value = moment(new Date()).add(i, 'months').startOf('month').valueOf;
            object.value = moment(new Date()).add(i, 'months').format('MM/YYYY');

            arrMonth.push(object);
        }

        let userRole = this.props.userInfo.roleId;
        let listOptions = [];
        if (userRole === "R1") {
            listOptions = this.state.listUsers;
        } else {
            let object = {};
            object.label = this.props.userInfo.lastName + " " + this.props.userInfo.firstName;
            object.value = this.props.userInfo.id
            listOptions.push(object);
        }

        return (
            <div className='manage-salary-container'>

                <div className='container-fluid'>
                    <div className='title'>
                        <FormattedMessage id='manage-salary.title' />

                    </div>
                    {this.state.statusId === 'S2' ?
                        <button className='btn btn-info my-3 mr-3'
                        // onClick={() => this.handleConfirmSalary()}
                        >
                            {/* <FormattedMessage id='manage-salary.save' /> */}
                            Bảng lương đã khóa
                        </button>

                        :

                        <button className='btn btn-primary my-3 btn-save mr-3'
                            onClick={() => this.handleSaveDetailSalary()}
                        >
                            <FormattedMessage id='manage-salary.save' />

                        </button>


                    }
                    {userRole === 'R1' ?
                        <button className='btn btn-danger my-3 btn-save'
                            onClick={() => this.handleConfirmSalary()}
                        >
                            <FormattedMessage id='manage-salary.confirm' />

                        </button>
                        :
                        ''
                    }

                    <div className='infor'>
                        <div className='select-staff'>
                            <div className='title-detail'><FormattedMessage id='manage-salary.staff' /></div>
                            <Select
                                name={'selectedStaff'}
                                value={this.state.selectedStaff}
                                onChange={this.handleChangeSelect}
                                options={listOptions}
                                placeholder={<FormattedMessage id='manage-salary.select-staff' />}
                            />
                        </div>

                        <div className='month-salary'>
                            <div className='title-detail'><FormattedMessage id='manage-salary.month' /></div>
                            <Select
                                name={'selectedMonth'}
                                value={this.state.selectedMonth}
                                onChange={this.handleChangeSelect}
                                options={arrMonth}
                                placeholder={<FormattedMessage id='manage-salary.select-month' />}
                            />
                        </div>
                    </div>
                    <hr></hr>

                    <div className='basic-deduction'>
                        <div className='basic-salary'>
                            <div className='title-detail'><FormattedMessage id='manage-salary.basic-salary' /></div>
                            <div className='basic-salary-detail'>
                                <label> <FormattedMessage id='manage-salary.money' /> (VND)</label>
                                <input className='form-control' type="text" placeholder="0"
                                    value={this.state.basicSalary}
                                    onChange={(event) => { this.onChangeInput(event, 'basicSalary') }}
                                    disabled={this.state.statusId === 'S2' || userRole !== 'R1' ? true : false}
                                />
                            </div>
                        </div>
                        <div className='deduction-salary'>
                            <div className='title-detail'><FormattedMessage id='manage-salary.deduction-salary' /></div>
                            <div className='deduction-salary-detail'>
                                <label><FormattedMessage id='manage-salary.deduction-days' /></label>
                                <input className='form-control' type="text" placeholder="0"
                                    value={this.state.deductionSalary}
                                    onChange={(event) => { this.onChangeInput(event, 'deductionSalary') }}
                                    disabled={this.state.statusId === 'S2' || userRole !== 'R1' ? true : false}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='bonus-project'>
                        <div className='bonus-salary form-group'>
                            <div className='title-detail'>
                                <FormattedMessage id='manage-salary.bonus-salary' />
                            </div>

                            <div className='bonus-salary-detail'>
                                <div className='left'>
                                    <label> <FormattedMessage id='manage-salary.reason' /></label>
                                    <input className='form-control' type="text"
                                        value={this.state.reason}
                                        onChange={(event) => { this.onChangeInput(event, 'reason') }}
                                        disabled={this.state.statusId === 'S2' || userRole !== 'R1' ? true : false}
                                    />
                                </div>
                                <div className='right'>
                                    <label> <FormattedMessage id='manage-salary.money' />(VND)</label>
                                    <input className='form-control' type="text" placeholder="0"
                                        value={this.state.bonusSalary}
                                        onChange={(event) => { this.onChangeInput(event, 'bonusSalary') }}
                                        disabled={this.state.statusId === 'S2' || userRole !== 'R1' ? true : false}
                                    />
                                </div>
                            </div>

                        </div>

                        <div className='project-salary form-group'>
                            <div className='title-detail'>
                                <FormattedMessage id='manage-salary.project-salary' />
                            </div>

                            <div className='project-salary-detail'>
                                <div className='left'>
                                    <label><FormattedMessage id='manage-salary.project-name' /></label>
                                    <input className='form-control' type="text"
                                        value={this.state.projectName}
                                        onChange={(event) => { this.onChangeInput(event, 'projectName') }}
                                        disabled={this.state.statusId === 'S2' || userRole !== 'R1' ? true : false}
                                    />
                                </div>
                                <div className='right'>
                                    <label> <FormattedMessage id='manage-salary.money' />(VND)</label>
                                    <input className='form-control' type="text" placeholder="0"
                                        value={this.state.projectSalary}
                                        onChange={(event) => { this.onChangeInput(event, 'projectSalary') }}
                                        disabled={this.state.statusId === 'S2' || userRole !== 'R1' ? true : false}
                                    />
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className='onsite-overtime'>

                        <div className='onsite-salary form-group'>
                            <div className='title-detail'>
                                <FormattedMessage id='manage-salary.onsite-salary' />
                            </div>

                            <div className='onsite-salary-detail'>
                                <div className='left'>
                                    <label><FormattedMessage id='manage-salary.onsite-place' /></label>
                                    <input className='form-control' type="text"
                                        value={this.state.onsitePlace}
                                        onChange={(event) => { this.onChangeInput(event, 'onsitePlace') }}
                                        disabled={this.state.statusId === 'S2' ? true : false}
                                    />
                                </div>
                                <div className='middle'>
                                    <label><FormattedMessage id='manage-salary.start-day' /></label>
                                    <DatePicker className='form-control'
                                        onChange={this.onChangeStartDay}
                                        value={this.state.startDay}
                                        // minDate={new Date()}
                                        disabled={this.state.statusId === 'S2' ? true : false}
                                    />
                                </div>
                                <div className='right'>
                                    <label><FormattedMessage id='manage-salary.end-day' /></label>
                                    <DatePicker className='form-control'
                                        onChange={this.onChangeEndDay}
                                        value={this.state.endDay}
                                        // minDate={new Date(this.state.startDay)}
                                        disabled={this.state.statusId === 'S2' ? true : false}
                                    />
                                </div>
                            </div>

                        </div>

                        <div className='overtime-salary form-group'>
                            <div className='title-detail'>
                                <FormattedMessage id='manage-salary.overtime-salary' />
                                {/* <button className='btn-add'>
                                <i className='fas fa-plus'></i>
                            </button> */}
                            </div>
                            <div className='overtime-salary-detail'>
                                <label> <FormattedMessage id='manage-salary.overtime-hours' /></label>
                                <input className='form-control' type="text" placeholder="0"
                                    value={this.state.overtimeHours}
                                    onChange={(event) => { this.onChangeInput(event, 'overtimeHours') }}
                                    disabled={this.state.statusId === 'S2' ? true : false}
                                />
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
        listUsers: state.admin.users,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        saveBasicSalaries: (data) => dispatch(actions.saveBasicSalaries(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSalary);
