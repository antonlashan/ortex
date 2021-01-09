import {
  Button,
  Container,
  CssBaseline,
  makeStyles,
  TextField,
  IconButton,
  InputAdornment,
} from '@material-ui/core';
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
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
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
    border: `2px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(3),
    borderRadius: 2,
  },
  header: {
    marginBottom: theme.spacing(1),
    textAlign: 'center',
  },
  headerImg: {
    width: '50%',
    filter: 'invert(1)',
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
          <div className={classes.header}>
            <img
              className={classes.headerImg}
              src='https://ortex-static-files.s3.amazonaws.com/static/public/images/ortex_logo_v-white.svg'
            />
          </div>
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
              color='secondary'
              className={classes.submit}
              disabled={!formState.isValid}
              size={'large'}
            >
              Login
            </Button>
          </form>
          <ResetPassword />
        </div>
      </Container>
    </>
  );
};

export default Login;
