import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageEvent.scss';
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils';

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const locales = {
    "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

const events = [
    {
        title: "Big Meeting",
        // allDay: true,
        start: new Date(2022, 10, 0),
        end: new Date(2022, 10, 0)
    },
    {
        title: "Vacation",
        // allDay: true,
        start: new Date(2022, 10, 7),
        end: new Date(2022, 10, 10)
    },
    {
        title: "Conference",
        // allDay: true,
        start: new Date(2022, 10, 20),
        end: new Date(2022, 10, 23)
    },
]

class ManageEvent extends Component {

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
        // const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
        // const [allEvents, setAllEvents] = useState(events);
        // funtion handleAddEvent () {
        //     setAllEvents([...allEvents, newEvent])
        // }

        return (
            <div className='calender-container container'>

                <Calendar localizer={localizer} events={events}
                    startAccessor="start" endAccessor="end"
                    style={{ height: 500, 'margin-top': "30px" }}
                />

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageEvent);
