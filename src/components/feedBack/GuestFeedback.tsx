import React from "react";
import { Box, Button, Paper, Rating, Typography } from "@mui/material";
import {FeedbackType} from "../../types";
import {getLocalStorageState, setLocalStorageState} from "../../localStorage";

type GuestFeedbackPropsType = {
  currentGuestFeedback: FeedbackType;
  setOpenModal: (value: boolean) => void;
};

export const GuestFeedback = ({
  currentGuestFeedback,
  setOpenModal
}: GuestFeedbackPropsType) => {
  const { name, phone, rating, comment } = currentGuestFeedback;

  const feedbacksFromLocalStorage = getLocalStorageState<FeedbackType[]>(
    "feedback",
    []
  );

  const handleDeleteClick = () => {
    const newFeedbackData = feedbacksFromLocalStorage.filter(
      (guest) => guest.name !== name
    );
    setLocalStorageState("feedback", newFeedbackData);
    setOpenModal(false);
  };

  return (
    <div>
      <Paper elevation={3}>
        <Box p={2} sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Name</Typography>
            <Button onClick={handleDeleteClick} color={"error"}>
              delete
            </Button>
          </Box>
          <Typography variant={"h4"}>{name}</Typography>
          <Box sx={{ margin: "10px 0" }}>
            <Rating name="read-only" value={rating} readOnly />
          </Box>
          <Box sx={{ margin: "0 0 10px 0" }}>
            <Typography variant={"h5"} sx={{ alignSelf: "flex-start" }}>
              PHONE
            </Typography>
            <Typography>{phone}</Typography>
          </Box>
          <Box sx={{ margin: "0 0 10px 0" }}>
            <Typography variant={"h5"} sx={{ alignSelf: "flex-start" }}>
              COMMENT
            </Typography>
            <Typography>{comment}</Typography>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};
