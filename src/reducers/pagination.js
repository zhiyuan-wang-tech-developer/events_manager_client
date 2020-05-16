import { GET_PAGINATION_INFO } from '../actions/events'

const initialState = {
    eventsTotal: 0,        // Total number of events in database table
    eventsPerPage: 0,      // Number of events displayed per page
    eventsStart: 0         // Starting offset for first event returned from database table
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PAGINATION_INFO: {
            return action.payload       // pagination info object
        }

        default:
            return state
    }
}

export default reducer