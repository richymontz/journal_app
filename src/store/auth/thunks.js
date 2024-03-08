import { logoutUser, registerUser, signInUser, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, login, logout } from "./authSlice"


export const checkingAuthentication = () => {
  return async (dispatch) => {
    // start user credentials check 
    dispatch(checkingCredentials());
  }
}

export const startGoogleSingIn = () => {
  return async (dispatch) => {

    // start user credentials check 
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();

    // console.log({ result })

    if (!result.ok) {
      return dispatch(logout(result.errorMessage));
    }

    dispatch(login(result));
  }
}

export const startCreatingUser = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage } = await registerUser({ email, password, displayName })

    if (!ok) return dispatch(logout({ errorMessage }));
    dispatch(login({ uid, displayName, email, photoURL }));

  }
}

export const startSignInUser = (email, password) => {

  return async (dispatch) => {
    dispatch(checkingCredentials());
    const { ok, displayName, photoURL, uid, errorMessage } = await signInUser(email, password);

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, email, photoURL }));

  }
}

export const startLogutUser = () => {
  return async (dispatch) => {
    await logoutUser();
    dispatch(clearNotesLogout());
    dispatch(logout());
  }
}
