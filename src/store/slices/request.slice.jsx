import { createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./isLoading.slice";
import axios from "axios";

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

export const getRequestThunk = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    dispatch(setIsLoading(true));
    const res = await axios.get(
      "https://requestserver-y82y.onrender.com/api/request",
      {
        headers: { token: token },
      }
    );
    if (res) {
      dispatch(setRequest(res.data));
    } else {
      console.error("No response received");
    }
  } catch (error) {
    console.error("Error fetching requests:", error);
    throw error;
  } finally {
    dispatch(setIsLoading(false));
  }
};

//Thunk que permitirá limpiar el array de las solicitudes

export const getClearThunk = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    await dispatch(setRequest([]));
  } catch (error) {
    console.error("Error clearing requests:", error);
  } finally {
    dispatch(setIsLoading(false));
  }
};

//Thunk para filtrar las solicitudes de acuerdo a las letras que coinciden del resumen, con las enviadas.

export const filterRequestTitleThunk =
  (title, role, employeeId) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token"));
    dispatch(setIsLoading(true));

    try {
      let response;

      if (role === "admin") {
        response = await axios.get(
          "https://requestserver-y82y.onrender.com/api/request",
          {
            headers: { token: token },
          }
        );
      } else if (role === "employee") {
        response = await axios.get(
          `https://requestserver-y82y.onrender.com/api/employee/${employeeId}`,
          {
            headers: { token: token },
          }
        );
      } else {
        dispatch(getClearThunk());
        return;
      }

      // Filtrar la lista de solicitudes
      const newList = response.data?.filter((request) =>
        request.summary?.toLowerCase().includes(title?.toLowerCase())
      );

      dispatch(setRequest(newList));
    } catch (error) {
      console.error(error.response?.data?.message || "Error fetching requests");
    } finally {
      dispatch(setIsLoading(false));
    }
  };

//Thunk para traer las solicitudes de UN empleado, se busca por ID del empleado

export const requestEmployeeThunk = (id) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("token"));
  dispatch(setIsLoading(true));

  try {
    const res = await axios.get(
      `https://requestserver-y82y.onrender.com/api/employee/${id}`,
      {
        headers: { token: token },
      }
    );

    console.log(res.data.requests);
    dispatch(setRequest(res.data.requests));
  } catch (error) {
    console.error(error.response?.data?.message || "Error fetching requests");
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const { setRequest } = requestSlice.actions;

export default requestSlice.reducer;
