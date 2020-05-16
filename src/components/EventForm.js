import React from 'react'
import { Button, InputLabel, InputAdornment, OutlinedInput } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import EventAvailableRoundedIcon from '@material-ui/icons/EventAvailableRounded'
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded'
import DescriptionIcon from '@material-ui/icons/Description'
import { Alert, AlertTitle } from '@material-ui/lab'

/**
 * @summary Display reminder alert bar
 * @param {object} props - props from parent node 
 */
function Reminder(props) {
    switch (props.message.level) {
        case 'error':
            return (
                <Alert severity='error'>
                    <AlertTitle>Error</AlertTitle>
                    {props.message.body}
                </Alert>
            )
        case 'warning':
            return (
                <Alert severity='warning'>
                    <AlertTitle>Warning</AlertTitle>
                    {props.message.body}
                </Alert>
            )
        case 'info':
            return (
                <Alert severity='info'>
                    <AlertTitle>Info</AlertTitle>
                    {props.message.body}
                </Alert>
            )
        case 'success':
            return (
                <Alert severity='success'>
                    <AlertTitle>Success</AlertTitle>
                    {props.message.body}
                </Alert>
            )
        default:
            return null
    }
}

class EventForm extends React.Component {
    render() {
        return (
            <form>
                <InputLabel variant='standard'>Name:</InputLabel>
                <OutlinedInput
                    type='text'
                    name='name'
                    onChange={(event) => this.props.onChange(event)}
                    value={this.props.values.name}
                    color='primary'
                    startAdornment={
                        <InputAdornment>
                            <EventAvailableRoundedIcon />
                        </InputAdornment>
                    }
                    fullWidth={true}
                />
                <br />
                <InputLabel variant='standard'>Date:</InputLabel>
                <OutlinedInput
                    type='text'
                    name='date'
                    onChange={(event) => this.props.onChange(event)}
                    value={this.props.values.date}
                    color='primary'
                    startAdornment={
                        <InputAdornment>
                            <ScheduleRoundedIcon />
                        </InputAdornment>
                    }
                    fullWidth={true}
                />
                <br />
                <InputLabel variant='standard'>Description:</InputLabel>
                <OutlinedInput
                    type='text'
                    name='description'
                    onChange={(event) => this.props.onChange(event)}
                    value={this.props.values.description}
                    color='primary'
                    startAdornment={
                        <InputAdornment>
                            <DescriptionIcon />
                        </InputAdornment>
                    }
                    fullWidth={true}
                />
                <br />
                <br />
                <Button
                    variant='contained'
                    color='primary'
                    size='medium'
                    startIcon={<SaveIcon />}
                    onClick={(event) => this.props.onSubmit(event)}
                >Save</Button>
                <br />
                <Reminder message={this.props.message} />
            </form>
        )
    }
}

export default EventForm