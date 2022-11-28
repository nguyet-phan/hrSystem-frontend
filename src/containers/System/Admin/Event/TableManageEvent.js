import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageEvent.scss';
import * as actions from "../../../../store/actions";
import { LANGUAGES, dateFormat } from '../../../../utils';

import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

class TableManageEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventsRedux: [],
            search: ''
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
    onChangeInput = (event, id) => {
        let copyState = { ...this.state };

        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    render() {
        let arrEvents = this.state.eventsRedux;
        let searchEvent = this.state.search;

        return (
            <>
                <div className='search-box'>
                    <Form>
                        <InputGroup className='my-3'>
                            <label className='search-title mr-3 pt-2'><FormattedMessage id='manage-event.search' /> </label>
                            <Form.Control
                                placeholder='...'
                                value={searchEvent}
                                onChange={(event) => this.onChangeInput(event, 'search')}
                            />
                        </InputGroup>
                    </Form>
                </div>
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
                            arrEvents.filter((item) => {
                                return searchEvent.toLowerCase() === ''
                                    ? item
                                    : item.eventName.toLowerCase().includes(searchEvent);
                            }).map((item) => {
                                return (
                                    <tr key={item.id}>
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
            </>
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
