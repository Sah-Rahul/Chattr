import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserById = createAsyncThunk("usres/fetchById", async () =>{
    console.log('thunk')
})