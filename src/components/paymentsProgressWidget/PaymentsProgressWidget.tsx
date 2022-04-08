import React from 'react';

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import {CircularProgressBar} from "../circularProgressBar/CircularProgressBar";

export const PaymentsProgressWidget = () => {

  return (
    <Grid container direction='column'>
      <Typography marginBottom={2}>Paid check progress</Typography>
      <CircularProgressBar
        maxValue={12}
        currentProgress={10}
      />
    </Grid>
  );
};