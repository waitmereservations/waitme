import { FETCH_PARTIES, UPDATE_PARTY_STATE, CREATE_WAITLIST, UPDATE_WAITLIST, UPDATE_WAITLIST_MSG, UPDATE_RESERVATION_MSG, CREATE_RESERVATION, UPDATE_RESERVATION, CREATE_WALKIN } from '../actions/types'

const initialState = {
    items: [], 
    waitList: {},
    reservation: {},
    waitListMsg: '', 
    reservationMsg: '', 
    party: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_PARTIES:
            return { ...state, 
                items: action.payload
            }
        case UPDATE_PARTY_STATE:
            return { ...state, 
                items: action.payload
            }    
        case CREATE_WAITLIST:
            return { ...state, 
                waitListMsg: action.payload
            }     
        case UPDATE_WAITLIST:
            return { ...state, 
                waitList: action.payload,
                waitListMsg: action.msg
            }    
        case UPDATE_WAITLIST_MSG:
            return { ...state, 
                waitListMsg: action.payload
            }    
        case UPDATE_RESERVATION_MSG:
            return { ...state, 
                reservationMsg: action.payload
            }    
        case CREATE_RESERVATION:
            return { ...state, 
                reservationMsg: action.payload,
            }     
        case UPDATE_RESERVATION:
            return { ...state, 
                reservation: action.payload,
                reservationMsg: action.msg
            } 
        case CREATE_WALKIN:
            return { ...state, 
                party: action.payload,
            }                             
        default: 
            return state;
    }
}