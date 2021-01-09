import { makeStyles } from '@material-ui/core';
import React, { ReactNode } from 'react';

import { Topbar } from './topbar/Topbar';

const useStyles = makeStyles((theme) => ({
  content: {
    height: '100%',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
}));

const Basic = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();

  return (
    <>
      <Topbar />
      <div className={classes.content}>{children}</div>
    </>
  );
};

export { Basic };
