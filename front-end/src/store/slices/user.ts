import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { Md5 } from 'ts-md5';

export interface IUserDetails {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface IUser {
  userDetails: IUserDetails | null;
}

export interface IUsers {
  [emailAndPass: string]: IUser;
}

export interface IUserSlice {
  loggedInUser: IUser | null;
  loginError: string | null;
  allUsers: IUsers;
}

const initialState: IUserSlice = {
  loginError: null,
  loggedInUser: null,
  allUsers: {}
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{email: string, password: string}>) => {
      const emailAndPass = `${action.payload.email}:${Md5.hashStr(action.payload.password)}`;
      if (!state.allUsers[emailAndPass]) {
        state.loginError = 'Invalid email or password';
        return;
      }
      state.loggedInUser = state.allUsers[emailAndPass];
    },
    register: (state, action: PayloadAction<IUserDetails>) => {
      action.payload.password = Md5.hashStr(action.payload.password);
      const emailAndPass = `${action.payload.email}:${action.payload.password}`;
      state.allUsers[emailAndPass] = { userDetails: action.payload };
      state.loggedInUser = state.allUsers[emailAndPass];
    },
    logout: (state) => {
      state.loggedInUser = null;
    },
    clearLoginError: (state) => {
      state.loginError = null;
    }
  }
});
export const userPersistConfig = {
  key: 'user',
  storage: storage,
}

export const { login, register, logout, clearLoginError } = userSlice.actions;

export default userSlice.reducer;
