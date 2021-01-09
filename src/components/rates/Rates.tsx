import { makeStyles, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';

interface SocketData {
  price: string;
  dt: string;
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.success.main,
    background: theme.palette.success.light,
    padding: theme.spacing(0, 2, 0, 2),
  },
  seperator: {
    margin: theme.spacing(0, 1, 0, 1),
  },
}));

export const Rates = () => {
  const classes = useStyles();
  const [state, setSates] = useState<SocketData>({ price: '0', dt: '0' });
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const socket = new WebSocket(process.env.REACT_APP_WS!);

    socket.onopen = () => {
      console.log('Sending to server');
      socket.send(`{"topic": "subscribe", "to": "EURUSD:CUR"}`);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data) as SocketData;
      console.log(data);
      setSates({ price: '12', dt: '999' });
    };

    socket.onerror = function (error) {
      console.log(error);
    };

    return () => {
      console.log('close');
      socket.close();
    };
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant='h6'>{state.price}</Typography>{' '}
      <span className={classes.seperator}>/</span>{' '}
      <Typography variant='overline'>{state.dt}</Typography>
    </div>
  );
};
