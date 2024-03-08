import { collection, deleteDoc, getDoc, getDocs } from 'firebase/firestore/lite';
import { addNewEmptyNote, setActiveNote, setSaving, startNewNote } from '../../../src/store'
import { FirebaseDB } from '../../../src/firebase/config';

describe('journal thunks', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  const uid = '3h12kj3h12jk3';

  beforeEach(() => { jest.clearAllMocks() });

  test('should call startNewNote ', async () => {

    getState.mockReturnValue({
      auth: { uid: uid }
    });

    await startNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(setSaving());
    expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
      title: "",
      body: "",
      imageURLs: [],
      createdAt: expect.any(Number),
      id: expect.any(String),
    }));

    expect(dispatch).toHaveBeenCalledWith(setActiveNote({
      title: "",
      body: "",
      imageURLs: [],
      createdAt: expect.any(Number),
      id: expect.any(String),
    }));

    const collectionRef = collection(FirebaseDB, `${'3h12kj3h12jk3'}/journal/notes`)
    const docs = await getDocs(collectionRef);

    const deletePromises = [];
    docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)));

    await Promise.all(deletePromises);

  });
});
