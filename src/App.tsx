import React from 'react';
import {FeedbackWidget} from "./components/feedBack/FeedbackWidget";
import { PaymentsWidget } from './components/feedBack/payments/PaymentsWidget';

export const App = () => {
  return (
    <div>
    <PaymentsWidget />
    <FeedbackWidget />
    </div>
  );
}