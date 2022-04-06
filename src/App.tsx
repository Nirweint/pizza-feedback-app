import React from 'react';
import {Header} from "./components/header/Header";
import {Dashboard} from "./pages/dashboard/Dashboard";
import { PaymentsWidget } from './components/feedBack/payments/PaymentsWidget';

export const App = () => {
  return (
    <>
      <Header/>
      <Dashboard/>
      <PaymentsWidget />
    </>
  );
}