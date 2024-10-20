import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';


export const requestSlice = createSlice({
    name: 'request',
    initialState: [],
    reducers: {

        setRequest: (state, action) => {
            if(Array.isArray(action.payload)){
               return action.payload}
               else{
                state.push(action.payload)
            }

        }
    }
})
const token = localStorage.getItem('token')
export const getRequestThunk = () => dispatch => {
    dispatch(setIsLoading(true))
    
        axios.get('http://localhost:8000/api/request', {
            headers:{ "token": token}
          
           })
        .then((res)=>{dispatch(setRequest(res.data))})
        .finally(()=>dispatch(setIsLoading(false)))     
       
}

export const filterRequestThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(false))
    try{
     let uniqueProduct = state?.find(request=> request.requestId == id)
       dispatch(setProducts([uniqueProduct]))
     dispatch(setIsLoading(false))}
     catch(error){throw error}
}


export const filterRequestTitleThunk = (title) => (dispatch) => {
    dispatch(setIsLoading(true));
         axios.get('http://localhost:8000/api/request', {
            headers:{ "token": token}
          
           })
        .then((res)=>
            {const newList = res.data?.filter(request=> request.summary?.toLowerCase().includes(title?.toLowerCase()))
              dispatch(setRequest(newList))

            })
        .finally(()=>dispatch(setIsLoading(false)))
}

export const { setRequest } = requestSlice.actions;

export default requestSlice.reducer;
