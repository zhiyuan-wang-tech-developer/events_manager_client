import React from 'react'
import { connect } from 'react-redux'
import { createEvent } from '../actions/events'
import EventForm from './EventForm'

class CreateEventFormContainer extends React.Component {
    // internal state to store contents from input boxes
    state = {
        event: {
            name: '',
            date: '',
            description: ''
        },
        message: {
            level: '',      // message severity level: 'error', 'warning', 'info', 'success'
            body: '',
        }
    }

    // Get called by input element
    onChange = event => {
        this.setState(
            {
                event: {
                    ...this.state.event,
                    [event.target.name]: event.target.value
                },
                message: {
                    level: 'info',
                    body: `The ${event.target.name} is changing...`
                }
            }
        )
    }

    onSubmit = event => {
        event.preventDefault()  // prevent normal submitting and refresh
        // clear message
        this.setState({ message: { level: '', body: '' } })
        if (this.state.event.name.length === 0) {
            this.setState({ message: { level: 'error', body: 'Please input name!' } })
            return
        }
        if (this.state.event.date.length === 0) {
            this.setState({ message: { level: 'error', body: 'Please input date!' } })
            return
        }
        if (this.state.event.description.length === 0) {
            this.setState({ message: { level: 'error', body: 'Please input description!' } })
            return
        }
        this.setState({ message: { level: 'success', body: 'Successful Saving' } })
        this.props.createEvent(this.state.event)  // invoke action creator
        // Clear state.event so that it empties input boxes
        this.setState(
            {
                event: {
                    name: '',
                    date: '',
                    description: ''
                }
            }
        )
    }

    render() {
        return (
            <EventForm
                onChange={this.onChange}
                onSubmit={this.onSubmit}
                values={this.state.event}
                message={this.state.message}
            />
        )
    }
}

export default connect(null, { createEvent })(CreateEventFormContainer)