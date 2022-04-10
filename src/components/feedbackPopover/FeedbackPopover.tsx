import React from 'react';

import Typography from '@mui/material/Typography';
import {Box, Paper, Rating} from "@mui/material";

import {FeedbackType} from "../../types";


type FeedbackPopoverPropsType = {
  currentGuestFeedback: FeedbackType;
}

export const FeedbackPopover = ({currentGuestFeedback}: FeedbackPopoverPropsType) => {
  const {name, phone, rating, comment} = currentGuestFeedback;

  return (
    <>
      <Box p={2} sx={{display: "flex", flexDirection: "column"}}>
        <Box sx={{display: "flex", justifyContent: "space-between"}}>
          <Typography>Name</Typography>
        </Box>
        <Typography variant={"h4"}>{name}</Typography>
        <Box sx={{margin: "10px 0"}}>
          <Rating name="read-only" value={rating} readOnly/>
        </Box>
        <Box sx={{margin: "0 0 10px 0"}}>
          <Typography variant={"h5"} sx={{alignSelf: "flex-start"}}>
            PHONE
          </Typography>
          <Typography>{phone}</Typography>
        </Box>
        <Box sx={{margin: "0 0 10px 0"}}>
          <Typography variant={"h5"} sx={{alignSelf: "flex-start"}}>
            COMMENT
          </Typography>
          <Typography>{comment}</Typography>
        </Box>
      </Box>
    </>
  );
};