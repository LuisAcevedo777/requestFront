import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';


export const employeeSlice = createSlice({
    name: 'employee',
    initialState: [],
    reducers: {

        setEmployee: (state, action) => {
            if(Array.isArray(action.payload)){
               return action.payload}
               else{
                state.push(action.payload)
            }

        }
    }
})

const token = localStorage.getItem('token')
export const getEmployeeThunk = () =>(dispatch) => {
    dispatch(setIsLoading(true))
    
         axios.get('http://localhost:8000/api/employee/', {
            headers:{ "token": token}
          
           })
        .then((res)=>{dispatch(setEmployee(res.data))})
        .finally(()=>dispatch(setIsLoading(false)))
       
}

export const filterEmployeeTitleThunk = (title) => (dispatch) => {
    dispatch(setIsLoading(false))
    
        axios.get('http://localhost:8000/api/employee/', {
            headers:{ "token": token}
          
           })
       .then((res)=>
        {const newList = res.data?.filter(employee=> employee.name?.toLowerCase().includes(title?.toLowerCase()))
          dispatch(setEmployee(newList))

        })
    .finally(()=>dispatch(setIsLoading(false)))
}

export const deleteThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(false))
    
        axios.delete(`http://localhost:8000/api/employee/${id}`, {
            headers:{ "token": token}
          
           })
       .then((res)=>
        {console.log('eliminado con exito')
                  }
    )
    .finally(()=>dispatch(setIsLoading(false)))
}

              

export const { setEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
