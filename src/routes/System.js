import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';
import ManageSalary from '../containers/System/Admin/ManageSalary';
import ManageEvent from '../containers/System/Admin/ManageEvent';
import ManageDepartment from '../containers/System/Admin/ManageDepartment';
import Calender from '../containers/System/Admin/Calender';

class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/manage-salary" component={ManageSalary} />
                            <Route path="/system/manage-event" component={ManageEvent} />
                            <Route path="/system/calender" component={Calender} />
                            <Route path="/system/manage-department" component={ManageDepartment} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
