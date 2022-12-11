import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageSalaryMonth.scss';
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import moment from 'moment';
import { getAllSalaryByMonthService }
    from '../../../../services/userService';

class ManageSalaryMonth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedMonth: '',
            salaryMonth: []
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleChangeSelect = async (selectedMonth) => {
        this.setState({
            selectedMonth
        })

        let res;
        if (this.props.userInfo.roleId === "R1") {
            res = await getAllSalaryByMonthService('ALL', selectedMonth.value);
        }
        if (this.props.userInfo.roleId === "R2" || this.props.userInfo.roleId === "R3") {
            res = await getAllSalaryByMonthService(this.props.userInfo.id, selectedMonth.value);
        }

        this.setState({
            salaryMonth: res.data,
        })
    };

    render() {
        let arrMonth = [];
        arrMonth.push({ 'label': '11/2022', 'value': '11/2022' });
        for (let i = 0; i < 2; i++) {
            let object = {};
            object.label = moment(new Date()).add(i, 'months').format('MM/YYYY');
            object.value = moment(new Date()).add(i, 'months').format('MM/YYYY');

            arrMonth.push(object);
        }

        let listMonth = this.state.salaryMonth;

        return (
            <div className='manage-salary-month '>

                <div className='total-salary container-fluid'>
                    <div className='title'>
                        <FormattedMessage id='manage-salary.total-salary-title' />
                        {/* {this.state.selectedMonth.value} */}
                    </div>
                    <div className='month-salary'>
                        {/* <div className='title-detail'><FormattedMessage id='manage-salary.month' /></div> */}
                        <Select
                            name={'selectedMonth'}
                            value={this.state.selectedMonth}
                            onChange={this.handleChangeSelect}
                            options={arrMonth}
                            placeholder={<FormattedMessage id='manage-salary.select-month' />}
                        />
                    </div>
                    <hr></hr>
                    <table className='detail-salary'>
                        <thead>
                            <tr>
                                <th><FormattedMessage id='manage-salary.staff' /></th>
                                {/* <th><FormattedMessage id='manage-user.position' /></th> */}
                                <th><FormattedMessage id='manage-salary.basic-salary' /></th>
                                <th><FormattedMessage id='manage-salary.bonus-salary' /></th>
                                <th><FormattedMessage id='manage-salary.project-salary' /></th>
                                <th><FormattedMessage id='manage-salary.onsite-salary' /></th>
                                <th><FormattedMessage id='manage-salary.overtime-salary' /></th>
                                <th><FormattedMessage id='manage-salary.deduction-salary' /></th>
                                <th><FormattedMessage id='manage-salary.total-salary' /></th>
                                {/* <th><FormattedMessage id='manage-salary.actions' /></th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {listMonth && listMonth.length > 0
                                && listMonth.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.User.lastName + ' ' + item.User.firstName}</td>
                                            {/* <td></td> */}
                                            <td>{item.basicSalaries}</td>
                                            <td>{item.bonusSalaries}</td>
                                            <td>{item.projectSalaries}</td>
                                            <td>{item.onsiteSalaries}</td>
                                            <td>{item.overtimeSalaries}</td>
                                            <td>{item.deductionSalaries}</td>
                                            <td>{item.basicSalaries + item.bonusSalaries + item.projectSalaries
                                                + item.onsiteSalaries + item.overtimeSalaries - item.deductionSalaries}</td>

                                            {/* <td>
                                                <button className='btn-edit'
                                                    onClick={() => this.handleDetailMonth(item)}
                                                ><i className='fas fa-pencil-alt'></i>
                                                </button>
                                            </td> */}
                                        </tr>

                                    )
                                })}
                        </tbody>
                    </table>
                </div>
                <hr></hr>

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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSalaryMonth);
