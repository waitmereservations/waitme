import { UPDATE_TABLE_RESERVATION } from '../actions/types'

const initialState = {
    items: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case UPDATE_TABLE_RESERVATION:
            return { ...state, 
                items: action.payload
            }
        default: 
            return state;
    }
}