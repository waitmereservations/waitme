import { FETCH_PARTIES, UPDATE_PARTY_STATE, CREATE_WAITLIST, UPDATE_WAITLIST, UPDATE_WAITLIST_MSG, UPDATE_RESERVATION_MSG, CREATE_RESERVATION, UPDATE_RESERVATION, CREATE_WALKIN } from './types'
import axios from 'axios';

export const fetchParties =  ()  => async dispatch => {
    const config = {
        method: 'get', 
        url: 'http://api:5000/party',
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
    const partyArray = await axios.put('http://api:5000/asigntable',partyTableObj);
    if (partyArray.status === 200) {
        dispatch({
            type: UPDATE_PARTY_STATE,
            payload: parties
        })
    }
}

export const createWaitList =  (waitListObj)  => async dispatch => {
    const props = { first_name: waitListObj.first_name, 
                    last_name: waitListObj.last_name, 
                    email_address: waitListObj.email_address, 
                    phone_number: waitListObj.phone_number,
                    party_type: waitListObj.party_type.name,
                    party_status: waitListObj.party_status.name,
                    party_size: waitListObj.party_size,
                    table_number: waitListObj.table.table_number,
                    quote_time: waitListObj.quote_time
                }
    const waitListRes = await axios.post('http://localhost:5000/waitlist',props);
    if (waitListRes.status === 200) {
        dispatch({
            type: CREATE_WAITLIST,
            payload: waitListRes.data
        })
    }
}

export const updateWaitList =  (waitListObj)  => async dispatch => {
    const props = { _id: waitListObj._id,
                    first_name: waitListObj.first_name, 
                    last_name: waitListObj.last_name, 
                    email_address: waitListObj.email_address, 
                    phone_number: waitListObj.phone_number,
                    party_type: waitListObj.party_type.name,
                    party_status: waitListObj.party_status.name,
                    party_size: waitListObj.party_size.toString(),
                    table_number: waitListObj.table.table_number,
                    quote_time: waitListObj.quote_time.toString()
                }
    let waitListRes  = ''   
    try {
        waitListRes = await axios.put('http://api:5000/waitlist',props);
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
    const props = { first_name: reservationObj.first_name, 
                    last_name: reservationObj.last_name, 
                    email_address: reservationObj.email_address, 
                    phone_number: reservationObj.phone_number,
                    party_type: reservationObj.party_type.name,
                    party_status: reservationObj.party_status.name,
                    party_size: reservationObj.party_size,
                    table_number: reservationObj.table.table_number,
                    reservation_time: reservationObj.reservation_time,
                    reservation_confirmed: reservationObj.reservation_confirmed
                }
     
    const reservationRes = await axios.post('http://api:5000/reservation',props);
    if (reservationRes.status === 200) {
        dispatch({
            type: CREATE_RESERVATION,
            payload: reservationRes.data
        })
    }
}

export const updateReservation =  (reservationObj)  => async dispatch => {
    const props = { _id: reservationObj._id,
                    first_name: reservationObj.first_name, 
                    last_name: reservationObj.last_name, 
                    email_address: reservationObj.email_address, 
                    phone_number: reservationObj.phone_number,
                    party_type: reservationObj.party_type.name,
                    party_status: reservationObj.party_status.name,
                    party_size: reservationObj.party_size.toString(),
                    table_number: reservationObj.table.table_number,
                    reservation_time: reservationObj.reservation_time.toString(),
                    reservation_confirmed: reservationObj.reservation_confirmed
                }
    let reservationRes  = ''   
    try {
        reservationRes = await axios.put('http://api:5000/reservation',props);
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

    const walkinRes = await axios.post('http://api:5000/walkin',props);
    if (walkinRes.status === 200) {
        dispatch({
            type: CREATE_WALKIN,
            payload: walkinObj
        })
    }
}