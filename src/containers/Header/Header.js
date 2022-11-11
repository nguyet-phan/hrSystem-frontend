import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils';

class Header extends Component {
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
        //fire redux event: actions
    }

    render() {
        console.log('check props: ', this.props);

        const { processLogout, language, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                <div className='languages'>
                    <span className='welcome'><FormattedMessage id="homeheader.welcome" />
                        {userInfo && userInfo.firstName ? userInfo.firstName : ''}
                    </span>
                    <span
                        className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}
                        onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>
                        VI
                    </span>
                    <span
                        className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}
                        onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>
                        EN
                    </span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title='Log out'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
