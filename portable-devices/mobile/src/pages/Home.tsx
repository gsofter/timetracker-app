import { Redirect } from 'react-router'
import { MobileRoutes } from '../constants/routes'
import * as React from 'react';

export const Home = () => {
  return <Redirect to={MobileRoutes.login} />
}