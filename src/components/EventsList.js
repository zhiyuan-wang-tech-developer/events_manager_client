import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

// Presentational Component
class EventsList extends React.Component {
    render() {
        // events is an array of events
        let events = this.props.events
        if (events) {
            return (
                <ul>
                    {
                        events.map(event => {
                            return (
                                <li key={event.id}>
                                    <Link to={`/event/${event.id}`} >
                                        <Typography color='initial'>{event.name}</Typography>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            )
        }
        else {
            // events is null
            return (
                <Container>
                    <Typography align='center' color='textPrimary' variant='h3'>
                        Loading...
                        <br />
                        <CircularProgress align='center' color='primary' variant='indeterminate' thickness={5} size='3rem' />
                    </Typography>
                </Container>
            )
        }
    }
}

export default EventsList