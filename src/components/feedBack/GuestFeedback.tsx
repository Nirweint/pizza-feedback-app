import React from "react";

import {useDispatch} from "react-redux";
import {Box, Button, Paper, Rating, Typography} from "@mui/material";

import {setFeedbackAC} from "../../store/reducers/feedback";
import {getLocalStorageState, setLocalStorageState} from "../../localStorage";
import {
  COMMENT_INPUT_TEXT,
  PHONE_INPUT_TEXT
} from "../../wordsList/feedbackWidgetWordsList";
import {DELETE_BUTTON_TEXT} from "../../wordsList/common";

import {FeedbackType} from "../../types";

type GuestFeedbackPropsType = {
  currentGuestFeedback: FeedbackType;
  setOpenModal: (value: boolean) => void;
};

export const GuestFeedback = ({
                                currentGuestFeedback,
                                setOpenModal
                              }: GuestFeedbackPropsType) => {
  const dispatch = useDispatch()
  const {name, phone, rating, comment} = currentGuestFeedback;

  const feedbacksFromLocalStorage = getLocalStorageState<FeedbackType[]>(
    "feedback",
    []
  );

  const handleDeleteClick = () => {
    const newFeedbackData = feedbacksFromLocalStorage.filter(
      (guest) => guest.name !== name
    );
    setLocalStorageState("feedback", newFeedbackData);
    dispatch(setFeedbackAC(newFeedbackData))
    setOpenModal(false);
  };

  return (
    <div>
      <Paper elevation={3}>
        <Box p={2} sx={{display: "flex", flexDirection: "column"}}>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography>Name</Typography>
            <Button onClick={handleDeleteClick} color={"error"}>
              {DELETE_BUTTON_TEXT}
            </Button>
          </Box>
          <Typography variant={"h4"}>{name}</Typography>
          <Box sx={{margin: "10px 0"}}>
            <Rating name="read-only" value={rating} readOnly/>
          </Box>
          <Box sx={{margin: "0 0 10px 0"}}>
            <Typography variant={"h5"} sx={{alignSelf: "flex-start"}}>
              {PHONE_INPUT_TEXT}
            </Typography>
            <Typography>{phone}</Typography>
          </Box>
          <Box sx={{margin: "0 0 10px 0"}}>
            <Typography variant={"h5"} sx={{alignSelf: "flex-start"}}>
              {COMMENT_INPUT_TEXT}
            </Typography>
            <Typography>{comment}</Typography>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};
