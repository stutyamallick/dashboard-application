import * as actionType from './actionTypes';
import Axios from 'axios';

export const getAllUsers = query => (dispatch) => {
    Axios.get('https://jsonplaceholder.typicode.com/todos')
    .then((response)=>{
        dispatch({
            type: actionType.GET_ALL_USERS,
            payload: response.data
        })
    })
    .catch((error)=>{
        console.log('Error while fetching users. ',error)
    })
}
export const getSingleUser = query => (dispatch) => {
    Axios.get('https://jsonplaceholder.typicode.com/todos/'+query)
    .then((response)=>{
        dispatch({
            type: actionType.GET_SINGLE_USERS,
            payload: response.data
        })
    })
    .catch((error)=>{
        console.log('Error while fetching user: ',query,'   ',error)
    })
}