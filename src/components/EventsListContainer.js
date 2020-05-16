import React from 'react'
import { loadEvents } from '../actions/events'
import { connect } from 'react-redux'
import EventsList from './EventsList'
import CreateEventFormContainer from './CreateEventFormContainer'
import Pagination from '@material-ui/lab/Pagination'
import { Container, Typography } from '@material-ui/core'

class EventsListContainer extends React.Component {
    state = {
        currentPage: 1
    }

    EVENTS_PER_PAGE = 10         // Limit the number of events displayed per page
    EVENT_START_OFFSET = 0      // Starting offset for first event fetched from database table

    componentDidMount() {
        // load events from backend server
        this.props.loadEvents(this.EVENTS_PER_PAGE, this.EVENT_START_OFFSET)     // invoke the action creator
    }

    /**
     * @param {object} event - event trigger source
     * @param {number} pageNum - current page number in pagination bar
     */
    handlePageChange = (event, pageNum) => {
        this.setState(
            { currentPage: pageNum }
        )
        this.props.loadEvents(this.EVENTS_PER_PAGE, this.EVENTS_PER_PAGE * (pageNum - 1))
    }

    render() {
        const pageCount = Math.ceil(this.props.pageInfo.eventsTotal / this.EVENTS_PER_PAGE)
        return (
            <Container maxWidth='sm'>
                <EventsList events={this.props.events} />
                <br />
                <Typography>Page: {this.state.currentPage}</Typography>
                <Pagination
                    count={pageCount}
                    color="primary"
                    shape='rounded'
                    size='small'
                    page={this.state.currentPage}
                    onChange={this.handlePageChange}
                    showFirstButton
                    showLastButton />
                <br />
                <CreateEventFormContainer />
            </Container>
        )
    }
}

/**
 * @param {object} state - redux store's state
 * @returns {object} This EventsListContainer component's props object
 */
const mapStateToProps = state => {
    return {
        events: state.events,
        pageInfo: state.pageInfo
    }
}

export default connect(mapStateToProps, { loadEvents })(EventsListContainer)