import { EVENTS_FETCHED, EVENT_CREATE_SUCCESS, EVENT_DELETE_SUCCESS } from '../actions/events'

const initialState = null

/**
 * @summary events reducer
 * @param {array} state - holds the array of events in previous state
 * @param {object} action - action dispatched from loadEvents(), createEvent()
 */
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case EVENTS_FETCHED: {
            // action's payload holds the fetched events in an array
            return action.payload
        }

        case EVENT_CREATE_SUCCESS: {
            // action's payload holds the created event
            return [...state, action.payload]
        }

        case EVENT_DELETE_SUCCESS: {
            // action's payload holds the deleted event ID
            let events = state
            let deleted_event_id = action.payload
            return events.filter(event => (event.id !== deleted_event_id))
        }

        default:
            return state
    }
}

export default reducer