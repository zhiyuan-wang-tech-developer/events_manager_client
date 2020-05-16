import React from 'react'
import { connect } from 'react-redux'
import EventDetails from './EventDetails'
import { loadEvent, updateEvent, deleteEvent } from '../actions/events'

class EventDetailsContainer extends React.Component {
    componentDidMount() {
        // The Route component can have access to match object by this.props.match,
        // which contains path parameters parsed from url.
        let eventId = Number(this.props.match.params.id)    // match the route paramter 'id'
        this.props.loadEvent(eventId)
    }

    // When the component initializes, set the 'editMode' to false
    state = {
        editMode: false,
        message: { level: '', body: '' }
    }

    /**
     * @summary To toggle the 'editMode'
     */
    onEdit = () => {
        // Initialize the 'editMode':
        // Set the starting value of the fields to the event details
        this.setState(
            {
                editMode: true,
                formValues: {
                    name: this.props.event.name,
                    date: this.props.event.date,
                    description: this.props.event.description
                }
            }
        )
    }

    /**
     * @summary To handle changes in the form state
     * @param {object} event - event from <input> field 
     */
    onChange = (event) => {
        if (event.target.value.length === 0) {
            this.setState(
                {
                    message: {
                        level: 'warning',
                        body: `Empty ${event.target.name} is not allowed!`
                    }
                }
            )
        }
        // update the formValues property with the new event data from the input field
        this.setState(
            {
                formValues: {
                    ...this.state.formValues,
                    [event.target.name]: event.target.value
                }
            }
        )
    }

    /**
     * @summary To update event and put 'editMode' to false
     * @param {object} event - event from input field
     */
    onSubmit = (event) => {
        event.preventDefault()
        if (this.state.formValues.name.length === 0) {
            this.setState(
                {
                    message: { level: 'error', body: 'Please input name!' }
                }
            )
            return
        }
        if (this.state.formValues.date.length === 0) {
            this.setState(
                {
                    message: { level: 'error', body: 'Please input date!' }
                }
            )
            return
        }
        if (this.state.formValues.description.length === 0) {
            this.setState(
                {
                    message: { level: 'error', body: 'Please input description!' }
                }
            )
            return
        }
        this.props.updateEvent(this.props.event.id, this.state.formValues)
        // After submitting, close the edit mode
        this.setState(
            {
                editMode: false,
                message: {
                    level: 'success',
                    body: 'Successful Update!'
                }
            }
        )
    }

    /**
     * @summary To cancel event update and put 'editMode' to false
     */
    onCancel = () => {
        this.setState(
            {
                editMode: false,
                message: { level: '', body: '' }
            }
        )
    }

    onDelete = () => {
        this.props.deleteEvent(this.props.event.id)
        // Redirect to root '/'
        this.props.history.push('/')
    }

    render() {
        return (
            <EventDetails
                event={this.props.event}
                editable={this.state.editMode}
                formValues={this.state.formValues}
                onEdit={this.onEdit}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
                onDelete={this.onDelete}
                onCancel={this.onCancel}
                message={this.state.message}
            />
        )
    }
}

/**
 * 
 * @param {object} state - redux store's state
 * @returns {object} EventDetailsContainer component's props object
 */
const mapStateToProps = state => (
    {
        event: state.event
    }
)

export default connect(mapStateToProps, { loadEvent, updateEvent, deleteEvent })(EventDetailsContainer)