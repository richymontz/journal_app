import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom'

import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from '../../hooks';
import { startCreatingUser } from '../../store';


const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  },
    'Invalid email'
  ],
  password: [(value) => {
    return value.length >= 6
  },
    'Should be has more than 6 characters'
  ],
  displayName: [(value) => {
    return value.length >= 1
  },
    'Should be present'
  ]
}

export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false)

  const { status, errorMessage } = useSelector(state => state.auth)
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

  const {
    formState, displayName, email, password,
    onInputChange, isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true)

    if (!isFormValid) return;

    dispatch(startCreatingUser(formState));

  }

  return (
    <>
      <AuthLayout title="Register Account">
        <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Full Name"
                type='text'
                placeholder="Enter your full name"
                fullWidth
                name="displayName"
                value={displayName}
                onChange={onInputChange}
                error={!!displayNameValid && formSubmitted}
                helperText={displayNameValid}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Email"
                type='email'
                placeholder="example@exampledomain.com"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmitted}
                helperText={emailValid}

              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Password"
                type='password'
                placeholder="password"
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
                error={!!passwordValid && formSubmitted}
                helperText={passwordValid ? passwordValid : ''}
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
              <Grid item xs={12}>
                <Button
                  disabled={isCheckingAuthentication}
                  type='submit'
                  variant="contained"
                  fullWidth
                >
                  Register
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>
                Do you have an existing account?
              </Typography>
              <Link component={RouterLink} color='inherit' to='/auth/login'>
                Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </AuthLayout>
    </>
  )
}
