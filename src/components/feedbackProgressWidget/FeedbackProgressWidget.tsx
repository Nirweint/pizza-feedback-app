import React from 'react';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {LinearProcessBar} from "../linearProcessBar/LinearProcessBar";
import {getNumberOfEaters} from "../../utils";
import {useSelector} from "react-redux";
import {selectFeedbacks} from "../../store/selectors/feedback";
import {getLocalStorageState} from "../../localStorage";
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