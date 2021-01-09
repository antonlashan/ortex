import React, { Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { BasicLayout } from '../layouts/basic';

const Login = React.lazy(() => import('../views/login/Login'));

export const Router = () => {
  return (
    <BrowserRouter>
      <BasicLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path={'/login'} component={Login} />
            <Redirect to={'/login'} />
          </Switch>
        </Suspense>
      </BasicLayout>
    </BrowserRouter>
  );
};
