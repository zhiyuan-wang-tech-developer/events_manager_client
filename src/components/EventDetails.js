import React from 'react'
import EventForm from './EventForm'
import { Link } from 'react-router-dom'
import { Container, Button, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForever from '@material-ui/icons/DeleteForever'
import CancelIcon from '@material-ui/icons/Cancel'
import CircularProgress from '@material-ui/core/CircularProgress'

class EventDetails extends React.Component {
    showNormalMode = () => {
        let event = this.props.event
        if (event) {
            // event is already loaded
            return (
                <div>
                    <Container>
                        <Typography align='left' component='span'>
                            <i>ID: {event.id}</i>
                            <p>Name: {event.name}</p>
                            <i>Date: {event.date}</i>
                            <p>Description: {event.description}</p>
                        </Typography>
                    </Container>
                    <br />
                    <Container>
                        <Button
                            variant='contained'
                            color='primary'
                            size='medium'
                            startIcon={<EditIcon />}
                            onClick={() => this.props.onEdit()}>EDIT</Button>
                        <Button
                            variant='contained'
                            color='secondary'
                            size='medium'
                            startIcon={<DeleteForever />}
                            onClick={() => this.props.onDelete()}>DELETE</Button>
                        <br />
                        <Link to={'/'}>
                            <Typography variant='h6'>Back</Typography>
                        </Link>
                    </Container>
                </div>
            )
        }
        else {
            // event is not loaded (null)
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

    showEditMode = () => {
        return (
            <Container maxWidth='sm'>
                <EventForm
                    values={this.props.formValues}
                    onChange={this.props.onChange}
                    onSubmit={this.props.onSubmit}
                    message={this.props.message}
                />
                <Button
                    variant='outlined'
                    color='default'
                    size='medium'
                    startIcon={<CancelIcon />}
                    onClick={() => this.props.onCancel()}
                >Cancel</Button>
            </Container>
        )
    }

    render() {
        if (this.props.editable) {
            return this.showEditMode()
        }
        else {
            return this.showNormalMode()
        }
    }
}

export default EventDetails