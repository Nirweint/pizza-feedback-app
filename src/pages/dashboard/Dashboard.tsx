import React from 'react';
import {FeedbackWidget} from "../../components/feedBack/FeedbackWidget";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {WidgetCard} from "../../components/widgetCard/WidgetCard";
import {FeedbackProgressWidget} from "../../components/feedbackProgressWidget/FeedbackProgressWidget";

export const Dashboard = () => {

  return (
    <>
      <Grid container p={2}>
        <Typography variant="h3">Dashboard</Typography>
        <Grid container>
          <Grid item marginRight={2}>
            <WidgetCard title='Feedback'>
              <FeedbackWidget/>
            </WidgetCard>
          </Grid>
          <Grid item marginRight={2}>
            <WidgetCard title='Feedback process'>
              <FeedbackProgressWidget/>
            </WidgetCard>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};