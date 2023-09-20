import { makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { getFormattedDate } from '../../utils/dates';

interface SocketData {
  price: number;
  dt: number;
  prev: number;
  topic: string;
}

interface RatesState {
  price: number;
  datetime: string;
  updown: 'priceUP' | 'priceDOWN';
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(0.5, 0, 0.5, 0),
    borderRadius: 2,
  },
  price: {
    padding: theme.spacing(0, 1, 0, 1),
    display: 'flex',
    alignItems: 'center',
  },
  currency: {
    marginRight: theme.spacing(1),
  },
  priceUP: {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.secondary.light,
  },
  priceDOWN: {
    color: theme.palette.warning.dark,
    backgroundColor: theme.palette.warning.light,
  },
}));

const currency = `EURUSD:CUR`;

export const Rates = () => {
  const classes = useStyles();
  const [state, setSates] = useState<RatesState>({
    price: 0,
    datetime: '',
    updown: 'priceUP',
  });
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const socket = new WebSocket(process.env.REACT_APP_WS!);

    socket.onopen = () => {
      socket.send(`{"topic": "subscribe", "to": "${currency}"}`);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data) as SocketData;

      if (data.topic === currency) {
        setSates({
          price: data.price,
          datetime: getFormattedDate(data.dt),
          updown: data.prev < data.price ? 'priceUP' : 'priceDOWN',
        });
      }
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
      <div className={clsx(classes.price, classes[state.updown])}>
        <Typography className={classes.currency} variant='overline'>
          {currency}
        </Typography>
        <Typography variant='subtitle2'>{state.price}</Typography>
      </div>
      <div>
        <Typography className={classes.currency} variant='overline'>
          Now
        </Typography>
        <Typography variant='overline'>{state.datetime}</Typography>
      </div>
    </div>
  );
};
