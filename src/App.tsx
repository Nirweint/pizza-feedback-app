import React from 'react';
import {Header} from "./components/header/Header";
import {Dashboard} from "./pages/dashboard/Dashboard";

export const App = () => {
  return (
    <>
      <Header/>
      <Dashboard/>
    </>
  );
}