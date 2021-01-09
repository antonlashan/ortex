import {
  Button,
  Container,
  CssBaseline,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { ResetPassword } from '../../components';
import { REG_EMAIL } from '../../utils/regex';

type FormData = {
  email: string;
  password: string;
};

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 40,
  },
  header: {
    marginBottom: theme.spacing(3),
  },
}));

const Login = () => {
  const { register, handleSubmit, errors, formState } = useForm<FormData>({
    mode: 'onChange',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = async ({ email, password }: FormData) => {
    console.log({ email, password });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(onSubmit)();
  };

  const classes = useStyles();

  return (
    <>
      <Container component='main' maxWidth='xs' className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography
            // component='h2'
            variant='h2'
            classes={{ root: classes.header }}
          >
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleFormSubmit}>
            <TextField
              type='email'
              error={errors.email !== undefined}
              helperText={errors.email?.message}
              variant='outlined'
              margin='normal'
              fullWidth
              label='Email'
              name='email'
              placeholder='abcd@abc.com'
              autoFocus
              inputRef={register({
                required: 'Email is required',
                pattern: {
                  value: REG_EMAIL,
                  message: 'Invalid email address',
                },
              })}
            />
            <TextField
              error={errors.password !== undefined}
              helperText={errors.password?.message}
              variant='outlined'
              margin='normal'
              type={showPassword ? 'text' : 'password'}
              fullWidth
              name='password'
              placeholder='*******'
              label='Password'
              inputRef={register({
                required: 'Password is required',
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              disabled={!formState.isValid}
            >
              Sign in
            </Button>
          </form>
          <ResetPassword />
        </div>
      </Container>
    </>
  );
};

export default Login;
