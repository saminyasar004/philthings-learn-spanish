import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/authSlice";
import authApi from "@/redux/authApi";

const store = configureStore({
	reducer: {
		auth: authReducer,
		[authApi.reducerPath]: authApi.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
