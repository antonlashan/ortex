import {
  TextField,
  Button,
  Dialog,
  Link,
  makeStyles,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { REG_EMAIL } from '../../utils/regex';

type PasswordChangeFormData = {
  email: string;
  password: string;
  repeatPassword: string;
};

const useStyles = makeStyles(() => ({
  reset: {
    cursor: 'pointer',
  },
}));

export const ResetPassword = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    errors,
    formState,
    watch,
  } = useForm<PasswordChangeFormData>({
    mode: 'onChange',
  });
  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = async ({
    email,
    password,
    repeatPassword,
  }: PasswordChangeFormData) => {
    console.log({ email, password, repeatPassword });
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(onSubmit)();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Link className={classes.reset} variant='body2' onClick={handleClickOpen}>
        Reset password
      </Link>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Password reset</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <TextField
              size='small'
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
              size='small'
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
            <TextField
              size='small'
              error={errors.repeatPassword !== undefined}
              helperText={errors.repeatPassword?.message}
              variant='outlined'
              margin='normal'
              type={showPassword ? 'text' : 'password'}
              fullWidth
              name='repeatPassword'
              placeholder='*******'
              label='Repeat password'
              inputRef={register({
                required: 'Repeat password is required',
                validate: (value) =>
                  value === password.current || 'The passwords do not match',
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

            <DialogActions>
              <Button onClick={handleClose} color='primary'>
                Cancel
              </Button>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                disabled={!formState.isValid}
              >
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
