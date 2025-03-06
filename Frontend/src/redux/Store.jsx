import { configureStore } from "@reduxjs/toolkit";
import useReducer from './reducer/UserSlice'





const store = configureStore({
     reducer: {
        users: useReducer
     }
});



export default store