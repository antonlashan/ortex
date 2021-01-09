import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
  flexGrow: {
    flexGrow: 1,
  },
}));

const Topbar = () => {
  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar>
        <Typography variant='h6'>Ortex</Typography>
        <div className={classes.flexGrow} />
      </Toolbar>
    </AppBar>
  );
};

export { Topbar };
