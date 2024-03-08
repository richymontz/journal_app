import { useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from 'react-router-dom'

import { useForm } from "../../hooks";
import { startGoogleSingIn, startSignInUser } from "../../store";

import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'

const initializeData = {
  email: '',
  password: ''
}

export const LoginPage = () => {
  const { status, errorMessage } = useSelector(state => state.auth)

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm(initializeData);

  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startSignInUser(email, password))
  }

  const onGoogleSingIn = (event) => {
    event.preventDefault();
    dispatch(startGoogleSingIn())
  }

  const onUserSignIn = (event) => {
    event.preventDefault();
    console.log(email);
    dispatch(startSignInUser(email, password))
  }

  return (
    <AuthLayout title="Login">
      <form
        aria-label="submit-form"
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="email"
              type='email'
              placeholder="example@exampledomain.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="password"
              type='password'
              placeholder="password"
              fullWidth
              name="password"
              inputProps={
                { 'data-testid': 'password' }
              }
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>

            <Grid
              item
              xs={12}
              display={!!errorMessage ? '' : 'none'}
            >
              <Alert severity='error'>
                {errorMessage}
              </Alert>
            </Grid>


            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                onClick={onUserSignIn}
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                onClick={onGoogleSingIn}
                aria-label="google-btn"
                fullWidth
              >
                <Google />
                <Typography sx={{ ml: 1 }}> Google </Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to='/auth/register'>
              Register an account
            </Link>
          </Grid>
        </Grid>
      </form>

    </AuthLayout>
  )
}
