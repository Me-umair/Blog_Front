import {createSlice} from "@reduxjs/toolkit";


const blogSlice = createSlice({
    name: 'blog',
    initialState:{
        value:{},
        blogid:""
    },
    reducers:{
        setdata:(state,actions)=>{
            state.value= actions.payload;
        },
        cleardata:(state)=>{
            state.value= {};
        },
        setblogid:(state,actions)=>{
            state.blogid= actions.payload;
        }
    }
});

export const {setdata,cleardata,setblogid} = blogSlice.actions;
export default blogSlice.reducer;