import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API } from "../http";
import { authStatus } from "../storetypes/storeTypes";

interface RegisterUser {
  email: string;
  password: string;
  username:string
}

interface LoginData {
  email: string;
  password: string;
}

interface User {
  email: string;
  password: string;
  token: string;
}

interface AuthState {
  user: User ;
  //network request:hen we hit the api
  status: string;
}

const initialState: AuthState = {
  user: {
    email: '',
    password: '',
    token: localStorage.getItem('token') || '', 
  } as User,
  status: authStatus.loading,
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
    resetStatus(state:AuthState){
      state.status =authStatus.loading
    },
    setToken(state:AuthState,action:PayloadAction<string>){
    state.user.token = action.payload
    },
    resetToken(state:AuthState){
      state.user.token = ''
    }
  },
});
//name of reducer and action should be same as the reduxtoolkit will make the action automatically
export const { setUser, setStatus,resetStatus,setToken,resetToken} = authSlice.actions;
export default authSlice.reducer;

export function register(data: RegisterUser) {
  return async function regsiterThunk(dispatch: any) {
    dispatch(setStatus(authStatus.loading))
    try {
      const response = await API.post("/register", data);
      if (response.status == 200) {
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
          const {data}=response.data
            dispatch(setToken(data))
            localStorage.setItem('token',data)
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
