import React from 'react';

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";

import {CircularProgressBar} from "../circularProgressBar/CircularProgressBar";
import {
  selectPaymentsMoneyCollected,
  selectPaymentsTotalOrder
} from "../../store/selectors/payments";
import {PAYMENTS_PROGRESS_TITLE_TEXT} from "../../wordsList/paymentsProgressWidgetWordsList";

export const PaymentsProgressWidget = () => {

  const moneyCollected = useSelector(selectPaymentsMoneyCollected);
  const totalOrder = useSelector(selectPaymentsTotalOrder);

  return (
    <Grid container direction='column'>
      <Typography marginBottom={2} >{PAYMENTS_PROGRESS_TITLE_TEXT}</Typography>
      <CircularProgressBar
        maxValue={totalOrder}
        currentProgress={moneyCollected}
      />
    </Grid>
  );
};