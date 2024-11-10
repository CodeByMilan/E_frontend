import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authStatus } from "../storetypes/storeTypes";
import API from "../http";

interface RegisterUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  userName: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface User {
  userName: string;
  email: string;
  password: string;
  token: string;
}

interface AuthState {
  user: User | null;
  //network request:hen we hit the api
  status: string;
}

const initialState: AuthState = {
  // userName: null,
  // email :null,
  // password :null,
  user: {} as User,
  status: '',
};
const authSlice = createSlice({
  //name of a slice
  name: "auth",
  //at the beginning of the app we have this state
  initialState,
  //reducer is a helping hand used to create a action which are called automatically when we call the action
  reducers: {
    setUser(state: AuthState, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setStatus(state: AuthState, action: PayloadAction<string>) {
      state.status = action.payload;
    },
  },
});
//name of reducer and action should be same as the reduxtoolkit will make the action automatically
export const { setUser, setStatus } = authSlice.actions;
export default authSlice.reducer;

export function register(data: RegisterUser) {
  return async function regsiterThunk(dispatch: any) {
    dispatch(setStatus(authStatus.loading))
    try {
      const response = await API.post("/register", data);
      if (response.status == 201) {
        dispatch(setStatus(authStatus.success))

      } else {
        dispatch(setStatus(authStatus.error))
        
      }
    } catch (error) {
      console.log("error");
      dispatch(setStatus(authStatus.error))
    }
  };
}

export function login(data: LoginData) {
  return async function loginThunk(dispatch: any){
    dispatch(setStatus(authStatus.loading))
    try{
        const response =await API.post("/login",data)
        if(response.status ===200){
            dispatch(setStatus(authStatus.success))
        }
        else{
            dispatch(setStatus(authStatus.error))
        }
    }catch(error){
        console.log(error)
        dispatch(setStatus(authStatus.error))
    }
  }

}
