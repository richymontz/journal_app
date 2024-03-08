import { logoutUser, signInUser, signInWithGoogle } from "../../../src/firebase/providers";
import { clearNotesLogout } from "../../../src/store";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startGoogleSingIn, startLogutUser, startSignInUser } from "../../../src/store/auth/thunks";
import { demoUser } from "../../fixtures/authFixture";


jest.mock('../../../src/firebase/providers');

describe('auth thunks', () => {

  beforeEach(() => jest.clearAllMocks());
  const dispatch = jest.fn();

  test('should invoke checkingCredentials ', async () => {

    await checkingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test('should call startGoogleSingIn', async () => {
    const loginData = { ok: true, ...demoUser };

    await signInWithGoogle.mockResolvedValue(loginData);
    await startGoogleSingIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('should call startGoogleSingIn with error', async () => {
    const loginData = { ok: false, errorMessage: 'Google error' };

    await signInWithGoogle.mockResolvedValue(loginData);
    await startGoogleSingIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test('should call startSignInUser ', async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: 'as8da9sd' };

    await signInUser.mockResolvedValue(loginData);
    await startSignInUser(formData.email, formData.password)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login({ ...demoUser }));

  });

  test('should call startLogutUser', async () => {
    await startLogutUser()(dispatch);

    expect(logoutUser).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  })



});
