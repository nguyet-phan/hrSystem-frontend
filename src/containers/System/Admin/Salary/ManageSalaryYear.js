import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageSalaryYear.scss';
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import moment from 'moment';
import { getAllSalaryByMonthService }
    from '../../../../services/userService';

class ManageSalaryYear extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedYear: '',
            month: '',
            salaryMonth: []
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleDetailMonth = (event) => {

    }

    handleChangeSelect = async (selectedYear) => {
        this.setState({
            selectedYear
        })

        let arrSalaryMonth = [];
        for (let i = 0; i < 12; i++) {
            let object = {};
            let monthIndex = i + 1;
            let monthYear = monthIndex + '/' + selectedYear.value;
            let res;
            if (this.props.userInfo.roleId === "R1") {
                res = await getAllSalaryByMonthService('ALL', monthYear);
            }
            if (this.props.userInfo.roleId === "R2" || this.props.userInfo.roleId === "R3") {
                res = await getAllSalaryByMonthService(this.props.userInfo.id, monthYear);
            }
            let totalSalaryMonth = 0;
            let listSlary = res.data;
            // if (res && res.errCode === 0 && res.data) {
            for (let i = 0; i < listSlary.length; i++) {
                totalSalaryMonth += listSlary[i].basicSalaries + listSlary[i].projectSalaries
                    + listSlary[i].bonusSalaries + listSlary[i].onsiteSalaries + listSlary[i].overtimeSalaries
                    - listSlary[i].deductionSalaries;
            }
            object.month = monthIndex;
            object.totalSalary = totalSalaryMonth
            arrSalaryMonth.push(object);

            // this.setState({
            //     salaryMonth: arrSalaryMonth,
            // })
            // }
            // else {
            //     this.setState({
            //         salaryMonth: 0,
            //     })
            // }

        }
        // console.log('check totalSalaryMonth: ', arrSalaryMonth);

        this.setState({
            salaryMonth: arrSalaryMonth,
        })
    };

    render() {
        let arrYear = [];
        for (let i = 0; i < 2; i++) {
            let object = {};
            object.label = moment(new Date()).add(i, 'years').format('YYYY');
            object.value = moment(new Date()).add(i, 'years').format('YYYY');
            arrYear.push(object);
        }

        let listMonth = this.state.salaryMonth;

        return (
            <div className='manage-salary-year '>
                <div className='container-fluid' >
                    <div className='title'>
                        <FormattedMessage id='manage-salary.total-salary-year' />
                    </div>
                    <div className='manage-salary-year-body'>
                        <div className='month-salary'>
                            {/* <div className='title-detail'><FormattedMessage id='manage-salary.month' /></div> */}
                            <Select
                                name={'selectedYear'}
                                value={this.state.selectedYear}
                                onChange={this.handleChangeSelect}
                                options={arrYear}
                                placeholder={<FormattedMessage id='manage-salary.select-year' />}
                            />
                        </div>
                        <hr></hr>

                        <div className='total-salary-year'>

                            <table className='month-table'>
                                <thead>
                                    <tr>
                                        <th><FormattedMessage id='manage-salary.year' /></th>
                                        <th><FormattedMessage id='manage-salary.month' /></th>
                                        <th><FormattedMessage id='manage-salary.total-salary' /></th>
                                        {/* <th><FormattedMessage id='manage-salary.actions' /></th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {listMonth && listMonth.length > 0
                                        && listMonth.map((item) => {
                                            return (
                                                <tr key={item.month}>
                                                    <td>{this.state.selectedYear.value}</td>
                                                    <td>{item.month}</td>
                                                    <td>{item.totalSalary}</td>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSalaryYear);
