import { authSlice, checkingCredentials, login, logout } from "../../../src/store";
import { authenticated, demoUser, initialState, notAuthenticated, notAuthenticatedWithError } from "../../fixtures/authFixture";

describe('authSlice', () => {
  test('should return initial state and call it "auth"', () => {
    const state = authSlice.reducer(initialState, {});

    expect(authSlice.name).toBe('auth');
    expect(state).toBe(initialState);
  });

  test('should authenticate user', () => {
    const state = authSlice.reducer(initialState, login(demoUser));

    expect(state).toEqual(authenticated);
  });

  test('should logout an user', () => {
    const state = authSlice.reducer(authenticated, logout({ errorMessage: null }));

    expect(state).toEqual(notAuthenticated);
  });

  test('should logout user with exception', () => {
    const state = authSlice.reducer(authenticated, logout({ errorMessage: 'Wrong credentials' }));

    expect(state).toEqual(notAuthenticatedWithError);
  });

  test('should change to checking', () => {

    const state = authSlice.reducer(authenticated, checkingCredentials(initialState, {}));

    expect(state.status).toBe('checking');

  })
});
