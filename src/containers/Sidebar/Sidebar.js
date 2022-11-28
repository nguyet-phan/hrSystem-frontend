import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, staffMenu } from '../Header/menuApp';
import './Sidebar.scss';
import { LANGUAGES, USER_ROLE } from '../../utils';
import _ from 'lodash';

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    componentDidMount() {
        // console.log('check user info: ', this.props.userInfo);
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }
            if (role === USER_ROLE.STAFF || role === USER_ROLE.MANAGER) {
                menu = staffMenu;
            }
        }
        this.setState({
            menuApp: menu
        })
    }

    render() {
        // console.log('check props: ', this.props);

        const { processLogout, language, userInfo } = this.props;

        return (
            <>
                <SideNav
                    onSelect={(selected) => {
                        console.log(selected)
                    }}
                    className='sidebar'
                    menus={this.state.menuApp}
                >
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="system/user-redux">
                        <NavItem eventKey="system/user-redux">
                            <NavIcon>
                                <i className="fa fa-fw fa-user" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Quản lý tài khoản
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="system">
                            <NavIcon>
                                <i className="fa fa-fw fa-calendar" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Quản lý sự kiện
                            </NavText>
                            <NavItem eventKey="system/manage-event">
                                <NavText>
                                    Sự kiện
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="system/calender">
                                <NavText>
                                    Lịch
                                </NavText>
                            </NavItem>
                        </NavItem>
                        <NavItem eventKey="system/manage-salary">
                            <NavIcon>
                                <i className="fas fa-sack-dollar" style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>
                                Bảng lương
                            </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
        //inject
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
