import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageEvent.scss';
import * as actions from "../../../../store/actions";
import { LANGUAGES, dateFormat, CRUD_ACTIONS } from '../../../../utils';
import TableManageEvent from './TableManageEvent';

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import DatePicker from '../../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';

class ManageEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventName: '',
            startDay: '',
            endDay: '',

            action: '',
            eventEditId: ''
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listEvents !== this.props.listEvents) {
            this.setState({
                eventName: '',
                startDay: '',
                endDay: '',
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }

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

    handleSaveEvent = () => {
        let { eventName, startDay, endDay } = this.state;

        if (!eventName || !startDay || !endDay) {
            toast.error("Bạn chưa nhập đủ thông tin!");
            return
        }

        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewEvent({
                eventName: this.state.eventName,
                startDay: moment(this.state.startDay).format(dateFormat.SEND_TO_SERVER),
                endDay: moment(this.state.endDay).format(dateFormat.SEND_TO_SERVER)
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editEventRedux({
                id: this.state.eventEditId,
                eventName: this.state.eventName,
                startDay: moment(this.state.startDay).format(dateFormat.SEND_TO_SERVER),
                endDay: moment(this.state.endDay).format(dateFormat.SEND_TO_SERVER)
            })
        }

        // this.props.fetchAllEvent();
    }

    handleEditEventFromParent = (event) => {
        this.setState({
            eventName: event.eventName,
            startDay: moment(event.startDay).format(dateFormat.SEND_TO_SERVER),
            endDay: moment(event.endDay).format(dateFormat.SEND_TO_SERVER),
            action: CRUD_ACTIONS.EDIT,
            eventEditId: event.id
        })
    }

    render() {
        let { eventName, startDay, endDay } = this.state;
        return (
            <div className='manage-event-container container'>
                <div className='title'>
                    <FormattedMessage id='manage-event.title' />
                </div>
                <div className='form-manage-event form-group'>
                    <div className='title-event '>
                        <label>
                            <FormattedMessage id='manage-event.event-name' />
                        </label>
                        <input className='form-control' type='text'
                            value={eventName}
                            onChange={(event) => this.onChangeInput(event, 'eventName')}
                        />
                    </div>
                    <div className='start-date'>
                        <label className='title-detail'>
                            <FormattedMessage id='manage-event.start-day' />
                        </label>
                        <DatePicker className='form-control'
                            onChange={this.onChangeStartDay}
                            value={this.state.startDay}
                        // minDate={new Date()}
                        />
                    </div>
                    <div className='end-date'>
                        <label className='title-detail'>
                            <FormattedMessage id='manage-event.end-day' />
                        </label>
                        <DatePicker className='form-control'
                            onChange={this.onChangeEndDay}
                            value={this.state.endDay}
                        // minDate={new Date()}
                        />
                    </div>
                    <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning mx-3' : 'btn btn-primary mx-3'}
                        onClick={() => this.handleSaveEvent()}
                    >
                        {this.state.action === CRUD_ACTIONS.EDIT ?
                            <FormattedMessage id='manage-event.edit' /> :
                            <FormattedMessage id='manage-event.save' />
                        }

                    </button>
                </div>

                <hr></hr>

                <TableManageEvent
                    handleEditEventFromParentKey={this.handleEditEventFromParent}
                    action={this.state.action}
                />
            </div>
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
        createNewEvent: (data) => dispatch(actions.createNewEvent(data)),
        fetchAllEvent: () => dispatch(actions.fetchAllEventStart()),
        editEventRedux: (data) => dispatch(actions.editEvent(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageEvent);
