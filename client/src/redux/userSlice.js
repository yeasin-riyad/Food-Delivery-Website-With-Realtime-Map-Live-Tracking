import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    city:null
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setCity:(state,action)=>{
      state.city=action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
    },  
  }
});

export const { setUserData, clearUserData,setCity } = userSlice.actions;
export default userSlice.reducer;