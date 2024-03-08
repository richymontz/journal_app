import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, setActiveNote, setActiveNotePhotos, setNotes, setSaving, updateNote } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth

    const newNote = {
      title: '',
      body: '',
      imageURLs: [],
      createdAt: new Date().getTime()
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));

  };
};


export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth

    const notes = await loadNotes({ uid });

    dispatch(setNotes(notes));
  };
};

export const startSavingNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFireStore = { ...note };

    delete noteToFireStore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFireStore, { merge: true });

    dispatch(updateNote(note));

  };
}

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    const uploadPromises = [];

    for (const file of files) {
      uploadPromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(uploadPromises);

    dispatch(setActiveNotePhotos(photosUrls));
  }
}

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteById(note.id));
  }
}
