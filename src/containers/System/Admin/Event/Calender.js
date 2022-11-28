import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageEvent.scss';
import * as actions from "../../../../store/actions";
import { LANGUAGES, dateFormat } from '../../../../utils';

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';

const locales = {
    // "en-US": require("date-fns/locale/en-US")
    "vi": require("date-fns/locale/vi")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

class ManageEvent extends Component {
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
    render() {
        let arrEvents = [];
        this.state.eventsRedux.map((key) => {
            arrEvents.push(
                {
                    title: key.eventName,
                    start: new Date(moment(key.startDay).format(dateFormat.SEND_TO_SERVER)),
                    end: new Date(moment(key.endDay).format(dateFormat.SEND_TO_SERVER))
                }
            )
        });
        // console.log('check arrEvents: ', arrEvents);

        return (
            <div className='calender-container container' style={{ marginTop: '60px' }}>

                <Calendar localizer={localizer}
                    events={arrEvents}
                    startAccessor="start" endAccessor="end"
                    style={{ height: 500, marginTop: "40px" }}
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
        fetchAllEvent: () => dispatch(actions.fetchAllEventStart()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ManageEvent);
