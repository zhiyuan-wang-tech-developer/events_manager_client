import { EVENT_FETCHED, EVENT_UPDATED } from '../actions/events'

const reducer = (state = null, action) => {
    switch (action.type) {
        case EVENT_FETCHED: {
            return action.payload   // fetched event object
        }

        case EVENT_UPDATED: {
            return action.payload   // updated event object
        }

        default:
            return state
    }
}

export default reducer