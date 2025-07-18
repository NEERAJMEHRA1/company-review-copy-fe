import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from '../pages/home';
import Ratings from '../pages/ratings';


export default function AppRoutes() {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    {path:"/ratings/:id",element :<Ratings/>}

  ]);

  return routes;
}
