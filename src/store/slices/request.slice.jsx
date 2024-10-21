import { createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./isLoading.slice";
import axios from "axios";

//Llamado al token del localStorage

const token = JSON.parse(localStorage.getItem("token"));

//Slice de las solicitudes

export const requestSlice = createSlice({
  name: "request",
  initialState: [],
  reducers: {
    setRequest: (state, action) => {
      if (Array.isArray(action.payload)) {
        return action.payload;
      } else {
        state.push(action.payload);
      }
    },
  },
});

//Thunk para traer las solicitudes de la base de datos y agregarlas al array de solicitudes

export const getRequestThunk = () => async(dispatch) => {
  dispatch(setIsLoading(true));

  await axios
    .get("http://localhost:8000/api/request", {
      headers: { token: token },
    })
    .then((res) => {
        dispatch(setRequest(res.data));
    }).catch((error)=>{message: error.response.data.message})
    .finally(() => dispatch(setIsLoading(false)));
};

//Thunk que permitirá limpiar el array de las solicitudes

export const getClearThunk = () => async(dispatch) => {
    dispatch(setIsLoading(true));
     await dispatch(setRequest([]));
      dispatch(setIsLoading(false));
  };



//Thunk para filtrar las solicitudes de acuerdo a las letras que coinciden del resumen, con las enviadas.

export const filterRequestTitleThunk = (title,role,employeeId) => async(dispatch) => {
  dispatch(setIsLoading(true));
 if(role==="admin"){
       await axios
    .get("http://localhost:8000/api/request", {
      headers: { token: token },
    })
    .then((res) => {
      const newList = res.data?.filter((request) =>
        request.summary?.toLowerCase().includes(title?.toLowerCase())
      );
      dispatch(setRequest(newList));
    }).catch((error)=>{error.response.data.message})
    .finally(() => dispatch(setIsLoading(false)));}
    else if(role=== "employee"){
        await axios
     .get(`http://localhost:8000/api/employee/${employeeId}`, {
       headers: { token: token },
     })
     .then((res) => {
       const newList = res.data.requests?.filter((request) =>
         request.summary?.toLowerCase().includes(title?.toLowerCase())
       );
       dispatch(setRequest(newList));
     }).catch((error)=>{error.response.data.message})
     .finally(() => dispatch(setIsLoading(false)));}
  else{
        dispatch(getClearThunk())
     
          }
 
};

//Thunk para traer las solicitudes de UN empleado, se busca por ID del empleado

export const requestEmployeeThunk = (id) => async(dispatch) => {
    dispatch(setIsLoading(true));
    await axios
    .get(`http://localhost:8000/api/employee/${id}`, {
      headers: { token: token }
    })
    .then((res) => {
        console.log(res.data.requests)
         dispatch(setRequest(res.data.requests))
        }).catch((error)=>{error.response.data.message})
    .finally(() => dispatch(setIsLoading(false)));
  };

export const { setRequest } = requestSlice.actions;

export default requestSlice.reducer;
