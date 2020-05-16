import request from 'superagent'

const baseURL = 'http://localhost:4000'

export const EVENTS_FETCHED = 'EVENTS_FETCHED'

/**
 * @summary action creator function
 * @param {[object]} events - an array of fetched events
 * @returns {object} an action object
 */
const eventsFetched = events => (
    {
        type: EVENTS_FETCHED,
        payload: events     // payload is an events array
    }
)

export const GET_PAGINATION_INFO = 'GET_PAGINATION_INFO'

/**
 * @summary action creator function
 * @param {object} paginationInfo contains: 'eventsTotal', 'eventsPerPage', 'eventsStart'
 * @returns {object} an action object
 */
const getPaginationInfo = paginationInfo => (
    {
        type: GET_PAGINATION_INFO,
        payload: paginationInfo
    }
)

/**
 * @summary thunk function to load events from backend server
 * @param {number} limit - query parameter indicates the number of events loaded at once from backend server
 * @param {number} offset - query parameter indicates the number of events to skip
 * @returns {function}
 */
export const loadEvents = (limit = 5, offset = 0) => {
    // Pagination Information
    const paginationInfo = {
        eventsTotal: 0,             // Total number of events in database table
        eventsPerPage: limit,       // Number of events displayed per page
        eventsStart: offset         // Starting offset for first event returned from database table
    }
    // return inner function that receives redux store.dispatch() and store.getState() as parameters
    return (dispatch, getState) => {
        // When the redux store's state already contains events, do not fetch them again.
        // let { events } = getState()
        // if (events) {
        //     return
        // }
        // GET /event?limit=5&offset=0 request
        request
            .get(`${baseURL}/event`)
            .query({
                limit,
                offset
            })
            .then(res => {
                let fetched_events = res.body.events
                paginationInfo.eventsTotal = res.body.total
                console.info('Total events in table: ', paginationInfo.eventsTotal)
                // dispatch an EVENTS_FETCHED action that contains the events
                dispatch(eventsFetched(fetched_events))
                dispatch(getPaginationInfo(paginationInfo))
            })
            .catch(console.error)
    }
}

export const EVENT_FETCHED = 'EVENT_FETCHED'

/**
 * @summary action creator function
 * @param {object} event - an fetched event
 * @returns {object} an action object
 */
const eventFetched = event => (
    {
        type: EVENT_FETCHED,
        payload: event      // payload is an fetched event object
    }
)

/**
 * @summary thunk function to load one event from backend server
 * @param {number} eventId
 * @returns {function}
 */
export const loadEvent = (eventId) => {
    return (dispatch, getState) => {
        let { event } = getState()
        if (event && event.id === eventId) {
            // When the redux store's state already contains the event, do not fetch it again
            return
        }
        // GET /event/:id request
        request
            .get(`${baseURL}/event/${eventId}`)
            .then(res => {
                dispatch(eventFetched(res.body))
            })
            .catch(console.error)
    }
}

export const EVENT_UPDATED = 'EVENT_UPDATED'

/**
 * @summary action creator function
 * @param {object} event - an updated event
 * @returns {object} an action object
 */
const eventUpdated = event => (
    {
        type: EVENT_UPDATED,
        payload: event      // payload is an updated event object
    }
)

/**
 * @summary thunk function to update one event in backend server
 * @param {number} eventId - the ID of an event to update
 * @param {object} eventUpdate - the event object to update
 * @returns {function}
 */
export const updateEvent = (eventId, eventUpdate) => {
    return (dispatch, getState) => {
        // PUT /event/:id request
        request
            .put(`${baseURL}/event/${eventId}`)
            .send(eventUpdate)
            .then(res => {
                // console.log(res)
                dispatch(eventUpdated(res.body))
            })
            .catch(console.error)
    }
}

export const EVENT_CREATE_SUCCESS = 'EVENT_CREATE_SUCCESS'

/**
 * @summary action creator function
 * @param {object} event - an created event 
 * @returns {object} an action object
 */
const eventCreateSuccess = event => (
    {
        type: EVENT_CREATE_SUCCESS,
        payload: event      // payload is an event
    }
)

/**
 * @summary thunk function to create an event to backend server
 * @param {object} event - an event object to create
 * @returns {function}
 */
export const createEvent = (event) => {
    return (dispatch) => {
        request
            .post(`${baseURL}/event`)
            .send(event)
            .then(res => {
                dispatch(eventCreateSuccess(res.body))
            })
            .catch(console.error)
    }
}

export const EVENT_DELETE_SUCCESS = 'EVENT_DELETE_SUCCESS'

/**
 * @summary action creator function
 * @param {number} eventId - the ID of an event object to delete
 * @returns {object} an action object
 */
const eventDeleteSuccess = (eventId) => (
    {
        type: EVENT_DELETE_SUCCESS,
        payload: eventId
    }
)

/**
 * @summary thunk function to delete one event in backend server
 * @param {number} eventId
 * @returns {function}
 */
export const deleteEvent = (eventId) => {
    return (dispatch, getState) => {
        // DELETE /event/:id request
        request
            .delete(`${baseURL}/event/${eventId}`)
            .then((res) => {
                console.log('Delete ', res.body.numDeleted, ' items')
                dispatch(eventDeleteSuccess(eventId))
            })
            .catch(console.error)
    }
}