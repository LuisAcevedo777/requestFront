import { createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./isLoading.slice";
import axios from "axios";

//Slice de empleados

export const employeeSlice = createSlice({
  name: "employee",
  initialState: [],
  reducers: {
    setEmployee: (state, action) => {
      if (Array.isArray(action.payload)) {
        return action.payload;
      } else {
        state.push(action.payload);
      }
    },
  },
});

//Llamado a token del localStorage

const token = JSON.parse(localStorage.getItem("token"));

//Thunk para cargar slice empleados con información de la base de datos

export const getEmployeeThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));

  axios
    .get("https://requestserver-y82y.onrender.com/api/employee/", {
      headers: { token: token },
    })
    .then((res) => {
      dispatch(setEmployee(res.data));
    })
    .finally(() => dispatch(setIsLoading(false)));
};

//Thunk para filtrar empleados de la base de datos con las letras enviadas

export const filterEmployeeTitleThunk = (title) => (dispatch) => {
  dispatch(setIsLoading(false));

  axios
    .get("https://requestserver-y82y.onrender.com/api/employee/", {
      headers: { token: token },
    })
    .then((res) => {
      const newList = res.data?.filter((employee) =>
        employee.name?.toLowerCase().includes(title?.toLowerCase())
      );
      dispatch(setEmployee(newList));
    })
    .finally(() => dispatch(setIsLoading(false)));
};

//Thunk para eliminar un empleado con el id

export const deleteThunk = (id) => (dispatch) => {
  dispatch(setIsLoading(false));

  axios
    .delete(`https://requestserver-y82y.onrender.com/api/employee/${id}`, {
      headers: { token: token },
    })
    .then((res) => {
      console.log("eliminado con exito");
    })
    .finally(() => dispatch(setIsLoading(false)));
};

export const { setEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
