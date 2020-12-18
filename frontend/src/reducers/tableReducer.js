import { FETCH_TABLES, UPDATE_TABLE_STATUS } from '../actions/types'

const initialState = {
    items: [], 
    item: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_TABLES:
            return { ...state, 
                items: action.payload
            }
        case UPDATE_TABLE_STATUS:
            return { ...state, 
                item: action.payload
            }    
        default: 
            return state;
    }
}