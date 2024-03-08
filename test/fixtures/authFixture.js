export const initialState = {
  status: 'checking',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
};

export const authenticated = {
  status: 'authenticated',
  uid: 'as98dasd8a0s9d8',
  email: 'john@example.com',
  displayName: 'John Doe',
  photoURL: 'https://photo.jpg',
  errorMessage: null
};

export const notAuthenticated = {
  status: 'not-authenticated',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
};

export const notAuthenticatedWithError = {
  status: 'not-authenticated',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: 'Wrong credentials'
};

export const demoUser = {
  uid: 'as98dasd8a0s9d8',
  email: 'john@example.com',
  displayName: 'John Doe',
  photoURL: 'https://photo.jpg'
}