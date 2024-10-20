import { createSlice } from "@reduxjs/toolkit";

//Slice de booleano del loading

export const isLoadingSlice = createSlice({
  name: "isLoading",
  initialState: false,
  reducers: {
    setIsLoading: (state, action) => {
      const isLoading = action.payload;
      return isLoading;
    },
  },
});

export const { setIsLoading } = isLoadingSlice.actions;
export default isLoadingSlice.reducer;
