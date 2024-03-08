import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const GoogleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, GoogleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result)
    const { displayName, email, photoURL, uid } = result.user

    return {
      ok: true,
      displayName, email, photoURL, uid
    }


  } catch (error) {
    console.error(error);
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorCode,
      errorMessage
    }
  }
}

export const registerUser = async ({ email, password, displayName }) => {
  console.log(email, password);
  try {
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);

    const { uid, photoURL } = resp.user

    await updateProfile(FirebaseAuth.currentUser, { displayName });

    return {
      ok: true,
      uid, photoURL, email, displayName
    }

  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message
    }
  }
}

export const signInUser = async (email, password) => {

  try {
    const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL, displayName } = result.user

    return {
      ok: true,
      displayName, email, photoURL, uid
    }

  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message
    }
  }
}

export const logoutUser = async () => {
  return await FirebaseAuth.signOut();
}