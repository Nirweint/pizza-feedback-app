import React from 'react';
import {FeedbackWidget} from "../../components/feedBack/FeedbackWidget";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {WidgetCard} from "../../components/widgetCard/WidgetCard";

export const Dashboard = () => {


  return (
    <>
      <Grid container p={2}>
        <Typography variant="h3">Dashboard</Typography>
        <Grid container>
          <WidgetCard>
            <FeedbackWidget/>
          </WidgetCard>
        </Grid>
      </Grid>
    </>
  );
};