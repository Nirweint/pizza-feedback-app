import React from 'react';

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";

import {LinearProcessBar} from "../linearProcessBar/LinearProcessBar";
import {getLocalStorageState} from "../../localStorage";
import {getNumberOfEaters} from "../../utils";
import {selectFeedbacks} from "../../store/selectors/feedback";

import {PartyGuestType} from "../../types";

export const FeedbackProgressWidget = () => {

  const guestsFromLocalStorage = getLocalStorageState<PartyGuestType[]>(
    "guests",
    []
  );

  const feedbacks = useSelector(selectFeedbacks);

  return (
    <Grid container>
      <Typography>Filled forms with feedback</Typography>
      <LinearProcessBar
        maxValue={getNumberOfEaters(guestsFromLocalStorage)}
        currentProgress={feedbacks.length}
      />
    </Grid>
  );
};