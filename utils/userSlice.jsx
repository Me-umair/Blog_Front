import {createSlice} from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'user',
    initialState:{
        value:JSON.parse(localStorage.getItem("user")) || null,
        data:{}
    },
    reducers:{
        logout:(state)=>{
            console.log(state.value)
            state.value=null;
            localStorage.removeItem("user");
        },
        login:(state,actions)=>{
            state.value= actions.payload;
        },
        userdata:(state,actions)=>{
            state.data=actions.payload;
        }
    }
});

export const {logout,login,userdata} = userSlice.actions;
export default userSlice.reducer;