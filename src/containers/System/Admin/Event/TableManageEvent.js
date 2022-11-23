import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageEvent.scss';
import * as actions from "../../../../store/actions";
import { LANGUAGES, dateFormat } from '../../../../utils';

import DatePicker from '../../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';

class TableManageEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventsRedux: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllEvent();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listEvents !== this.props.listEvents) {
            this.setState({
                eventsRedux: this.props.listEvents
            })
        }
    }
    handleDeleteUser = (event) => {
        this.props.deleteEventRedux(event.id);
    }
    handleEditUser = (event) => {
        this.props.handleEditEventFromParentKey(event);
    }

    render() {
        let arrEvents = this.state.eventsRedux;
        return (
            <table className='list-events'>
                <thead>
                    <tr>
                        <th><FormattedMessage id='manage-event.event-name' /></th>
                        <th><FormattedMessage id='manage-event.start-day' /></th>
                        <th><FormattedMessage id='manage-event.end-day' /></th>
                        <th><FormattedMessage id='manage-event.actions' /></th>
                    </tr>
                </thead>
                <tbody>
                    {arrEvents && arrEvents.length > 0 &&
                        arrEvents.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.eventName}</td>
                                    <td>{item.startDay}</td>
                                    <td>{item.endDay}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditUser(item)}
                                        ><i className='fas fa-pencil-alt'></i>
                                        </button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteUser(item)}
                                        ><i className='fas fa-trash'></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        );
    }

}

const mapStateToProps = state => {
    return {
        listEvents: state.admin.events
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllEvent: () => dispatch(actions.fetchAllEventStart()),
        deleteEventRedux: (id) => dispatch(actions.deleteEvent(id)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageEvent);
