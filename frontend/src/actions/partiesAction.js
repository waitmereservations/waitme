import { FETCH_PARTIES, UPDATE_PARTY_STATE, CREATE_WAITLIST, UPDATE_WAITLIST, UPDATE_WAITLIST_MSG, UPDATE_RESERVATION_MSG, CREATE_RESERVATION, UPDATE_RESERVATION, CREATE_WALKIN } from './types'
import axios from 'axios';

export const fetchParties =  ()  => async dispatch => {
    const config = {
        method: 'get', 
        url: process.env.REACT_APP_SERVER_URL + '/party',
        headers: { 'Content-Type' :'application/json'}
    }

    const partyArray = await axios(config);
    if (partyArray.status === 200) {
        dispatch({
            type: FETCH_PARTIES,
            payload: partyArray.data
        })
    }
}

export const updateParties =  (partyTableObj, parties)  => async dispatch => {
    const partyArray = await axios.put(process.env.REACT_APP_SERVER_URL + '/asigntable',partyTableObj);
    if (partyArray.status === 200) {
        dispatch({
            type: UPDATE_PARTY_STATE,
            payload: parties
        })
    }
}

export const createWaitList =  (waitListObj)  => async dispatch => {
    const props = { first_name: 'readonlyf', 
                    last_name: 'readonlyl', 
                    email_address: 'readonly@readonly.com', 
                    phone_number: '1231231232',
                    party_type: 'waitlist',
                    party_status: 'upcoming',
                    party_size: '2',
                    table_number: 'waitlist',
                    quote_time: '5'
                }
    const waitListRes = await axios.post(process.env.REACT_APP_SERVER_URL + '/waitlist',props);
    if (waitListRes.status === 200) {
        dispatch({
            type: CREATE_WAITLIST,
            payload: waitListRes.data
        })
    }
}

export const updateWaitList =  (waitListObj)  => async dispatch => {
    const props = { _id: waitListObj._id,
                    first_name: 'readonlyf', 
                    last_name: 'readonlyl', 
                    email_address: 'readonly@readonly.com', 
                    phone_number: '1231231232',
                    party_type: 'waitlist',
                    party_status: 'upcoming',
                    party_size: '2',
                    table_number: 'waitlist',
                    quote_time: '5'
                }
    let waitListRes  = ''   
    try {
        waitListRes = await axios.put(process.env.REACT_APP_SERVER_URL + '/waitlist',props);
        dispatch({
            type: UPDATE_WAITLIST,
            payload: waitListRes.data[0].stack, 
            msg: "saved successfully"
        })
    }      
    catch ( error ) {
        if (error.response) {
           // console.log(error.response.data[0])
            dispatch({
                type: UPDATE_WAITLIST,
                payload: "Error: " +  error.response.data[0].stack, 
                msg: "Error: " +  error.response.data[0].stack, 
            })   
        }
    }    
}

export const createReservation =  (reservationObj)  => async dispatch => {
    const props = { first_name: 'readonlyf', 
                    last_name: 'readonlyl', 
                    email_address: 'readonly@readonly.com', 
                    phone_number: '1231231232',
                    party_type: 'reservation',
                    party_status: 'upcoming',
                    party_size: '2',
                    table_number: 'reservation',
                    reservation_time: '10:00am',
                    reservation_confirmed: false
                }
     
    const reservationRes = await axios.post(process.env.REACT_APP_SERVER_URL + '/reservation',props);
    if (reservationRes.status === 200) {
        dispatch({
            type: CREATE_RESERVATION,
            payload: reservationRes.data
        })
    }
}

export const updateReservation =  (reservationObj)  => async dispatch => {
    const props = { _id: reservationObj._id,
                    first_name: 'readonlyf', 
                    last_name: 'readonlyl', 
                    email_address: 'readonly@readonly.com', 
                    phone_number: '1231231232',
                    party_type: 'reservation',
                    party_status: 'upcoming',
                    party_size: '2',
                    table_number: 'reservation',
                    reservation_time: '10:00am',
                    reservation_confirmed: false
                }
    let reservationRes  = ''   
    try {
        reservationRes = await axios.put(process.env.REACT_APP_SERVER_URL + '/reservation',props);
        if (reservationRes.status === 200){
            dispatch({
                type: UPDATE_RESERVATION,
                payload: reservationObj, 
                msg: "Successfully saved"
            })
        }
    }      
    catch ( error ) {
        if (error.response) {
            dispatch({
                type: UPDATE_RESERVATION,
                payload: reservationObj,
                msg: "Error: " +  error.response.data[0].stack,
            })   
        }
    }    
}

export const updateWaitListMsg =  ()  => async dispatch => {
        dispatch({
            type: UPDATE_WAITLIST_MSG,
            payload: ''
        })
}

export const updateReservationMsg =  ()  => async dispatch => {
    dispatch({
        type: UPDATE_RESERVATION_MSG,
        payload: ''
    })
}


export const createWalkin =  (walkinObj)  => async dispatch => {
    const props = { 
                    party_type: walkinObj.party_type,
                    party_status: walkinObj.party_status,
                    party_size: walkinObj.party_size,
                    table_number: walkinObj.table_number
                }

    const walkinRes = await axios.post(process.env.REACT_APP_SERVER_URL + '/walkin',props);
    if (walkinRes.status === 200) {
        dispatch({
            type: CREATE_WALKIN,
            payload: walkinObj
        })
    }
}