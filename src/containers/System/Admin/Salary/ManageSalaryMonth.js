import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageSalaryMonth.scss';
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../utils';

class ManageSalaryMonth extends Component {

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
            <div className='manage-salary-month '>

                <div className='total-salary container-fluid'>
                    <div className='title'>
                        <FormattedMessage id='manage-salary.total-salary-title' />
                        {/* {this.state.selectedMonth.value} */}
                    </div>
                    <table className='detail-salary'>
                        <thead>
                            <tr>
                                <th><FormattedMessage id='manage-salary.staff' /></th>
                                <th><FormattedMessage id='manage-user.position' /></th>
                                <th><FormattedMessage id='manage-salary.basic-salary' /></th>
                                <th><FormattedMessage id='manage-salary.bonus-salary' /></th>
                                <th><FormattedMessage id='manage-salary.project-salary' /></th>
                                <th><FormattedMessage id='manage-salary.onsite-salary' /></th>
                                <th><FormattedMessage id='manage-salary.overtime-salary' /></th>
                                <th><FormattedMessage id='manage-salary.deduction-salary' /></th>
                                <th><FormattedMessage id='manage-salary.total-salary' /></th>
                                <th><FormattedMessage id='manage-salary.actions' /></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Phan Nguyệt</td>
                                <td>Tester</td>
                                <td>5000000</td>
                                <td>500000</td>
                                <td>200000</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Xem chi tiết</td>
                            </tr>
                            <tr>
                                <td>Phan Nguyệt</td>
                                <td>Tester</td>
                                <td>5000000</td>
                                <td>500000</td>
                                <td>200000</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Xem chi tiết</td>
                            </tr>

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
        // userInfo: state.user.userInfo,
        // language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSalaryMonth);
