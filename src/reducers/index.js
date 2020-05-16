import { combineReducers } from 'redux'
import events from './events'
import event from './event'
import pageInfo from './pagination'

// Export a base reducer
export default combineReducers(
    {
        // Put reducers here
        events,     // state.events: an fetched events array
        event,      // state.event : an fetched event
        pageInfo    // state.pageInfo: an pagination info object
    }
)