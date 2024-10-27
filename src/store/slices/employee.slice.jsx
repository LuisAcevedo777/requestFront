import { createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./isLoading.slice";
import axios from "axios";

//Slice de empleados

const token = JSON.parse(localStorage.getItem("token"));

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

//Thunk para cargar slice empleados con información de la base de datos

export const getEmployeeThunk = () => async (dispatch) => {

  try {
    dispatch(setIsLoading(true));
    const res = await axios.get(
      "https://requestserver-y82y.onrender.com/api/employee/",
      {
        headers: { token: token },
      }
    );
    dispatch(setEmployee(res.data));
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  } finally {
    dispatch(setIsLoading(false));
  }
};

//Thunk para filtrar empleados de la base de datos con las letras enviadas

export const filterEmployeeTitleThunk = (title) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("token"));
  dispatch(setIsLoading(true));

  try {
    const res = await axios.get(
      "https://requestserver-y82y.onrender.com/api/employee/",
      {
        headers: { token: token },
      }
    );

    const newList = res.data?.filter((employee) =>
      employee.name?.toLowerCase().includes(title?.toLowerCase())
    );

    dispatch(setEmployee(newList));
  } catch (error) {
    console.error("Error filtering employees:", error);
  } finally {
    dispatch(setIsLoading(false));
  }
};

//Thunk para eliminar un empleado con el id

export const deleteThunk = (id) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("token"));
  dispatch(setIsLoading(true));

  try {
    await axios.delete(
      `https://requestserver-y82y.onrender.com/api/employee/${id}`,
      {
        headers: { token: token },
      }
    );

    console.log("Eliminado con éxito");
  } catch (error) {
    console.error("Error eliminando el empleado:", error);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const { setEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
