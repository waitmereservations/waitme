import { FETCH_TABLES, UPDATE_TABLE_STATUS } from './types'
import axios from 'axios';

export const fetchTables =  ()  => async dispatch => {
    const tablesArray = await axios.get(process.env.REACT_APP_SERVER_URL + '/table', {});
    if (tablesArray.status === 200) {
        dispatch({
            type: FETCH_TABLES,
            payload: tablesArray.data
        })
    }
}

export const updateTableStatus =  (tableObj)  => async dispatch => {
    const response = await axios.put(process.env.REACT_APP_SERVER_URL + '/updateTableStatus', { _id: tableObj.reservationid, table_status: tableObj.table_status, table_number: tableObj.table_number 
    })
    if (response.status === 200) {
        dispatch({
            type: UPDATE_TABLE_STATUS,
            payload: response.data
        })
    }
}