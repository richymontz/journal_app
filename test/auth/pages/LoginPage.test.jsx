import { Provider } from "react-redux";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../../src/store";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { notAuthenticated } from "../../fixtures/authFixture";

const mockStartGoogleSingIn = jest.fn();
const mockStartSignInUser = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
  startGoogleSingIn: () => mockStartGoogleSingIn,
  startSignInUser: (email, password) => {
    return () => mockStartSignInUser(email, password)
  }
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  preloadedState: {
    auth: notAuthenticated
  }
});

describe('LoginPage', () => {

  beforeEach(() => jest.clearAllMocks());

  test('should render component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
  });

  test('should call startGoogleSingIn', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const googleBtn = screen.getByLabelText('google-btn');
    fireEvent.click(googleBtn);

    expect(mockStartGoogleSingIn).toHaveBeenCalled();
  });

  test('should call startSignInUser', () => {
    const email = 'test@example.com';
    const password = 'passgood123';

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole('textbox', { name: 'email' });
    const passowrdField = screen.getByTestId('password');

    fireEvent.change(emailField, { target: { name: 'email', value: email } });
    fireEvent.change(passowrdField, { target: { name: 'password', value: password } });

    const loginForm = screen.getByLabelText('submit-form');

    fireEvent.submit(loginForm);

    expect(mockStartSignInUser).toHaveBeenCalledWith(email, password);




  })


});
