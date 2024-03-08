import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
  },
  reducers: {
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false
    },

    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = '';
    },

    setNotes: (state, action) => {
      state.notes = action.payload
    },

    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
    },

    updateNote: (state, action) => {
      state.isSaving = false

      state.notes = state.notes.map(note => {
        if (note.id === action.payload.id) {
          return { ...action.payload };
        }

        return note;
      })

      state.messageSaved = `'${action.payload.title}' was saved successfully!`
    },

    setActiveNotePhotos: (state, action) => {
      state.isSaving = false;
      state.active.imageURLs = [...state.active.imageURLs, ...action.payload];
    },

    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.notes = [];
      state.active = null;
      state.messageSaved = '';
    },

    deleteNoteById: (state, action) => {
      state.isSaving = false
      state.notes = state.notes.filter(note => note.id !== action.payload);
      state.active = null;
    }
  }
});


// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  setActiveNotePhotos,
  clearNotesLogout,
  deleteNoteById
} = journalSlice.actions;
