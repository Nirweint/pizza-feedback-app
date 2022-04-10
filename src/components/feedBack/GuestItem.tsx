import React, {useState} from "react";

import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import {FeedbackForm} from "./FeedbackForm";
import {GuestFeedback} from "./GuestFeedback";
import {FormModal} from './FormModal';
import {FeedbackPopover} from "../feedbackPopover/FeedbackPopover";
import {PopUp} from "../popUp/PopUp";
import {getLocalStorageState} from "../../localStorage";
import {USER_HAS_NO_FEEDBACK_TEXT} from "../../wordsList/feedbackWidgetWordsList";

import {FeedbackType, GuestDietType} from "../../types";

type GuestItemPropsType = {
  name: string;
  eatsPizza: boolean;
  guestDiet?: GuestDietType;
  handleGuestsListClick: () => void;
};

export const GuestItem = (props: GuestItemPropsType) => {
  const {guestDiet, eatsPizza, name, handleGuestsListClick} = props;

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const feedbacksFromLocalStorage = getLocalStorageState<FeedbackType[]>(
    "feedback",
    []
  );

  const handlePopUpOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopUpClose = () => {
    setAnchorEl(null);
  };

  const handleGuestClick = () => {
    handleGuestsListClick();
    setOpenModal(true);
  };

  const currentGuestFeedback = feedbacksFromLocalStorage.filter(
    (guest) => guest.name === name
  );

  const isCurrentGuestHasFeedback = currentGuestFeedback.length !== 0;

  return (
    <ListItem disablePadding>
      <ListItemButton
        data-testid='name-wrapper'
        disabled={!eatsPizza}
        onClick={handleGuestClick}
        aria-owns={Boolean(anchorEl) ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopUpOpen}
        onMouseLeave={handlePopUpClose}
      >
        {isCurrentGuestHasFeedback && (
          <ListItemIcon sx={{minWidth: 25}}>✅</ListItemIcon>)}
        <ListItemText
          data-testid='name-text'
          primary={name}
          style={{
            color: `${
              guestDiet && guestDiet.isVegan && eatsPizza ? "green" : ""
            }`
          }}
        />
      </ListItemButton>
      <PopUp onPopUpClose={handlePopUpClose} anchorEl={anchorEl}>
        {isCurrentGuestHasFeedback ? (
          <FeedbackPopover currentGuestFeedback={currentGuestFeedback[0]}/>
        ) : (
          <Typography>{USER_HAS_NO_FEEDBACK_TEXT}</Typography>
        )}
      </PopUp>
      {isCurrentGuestHasFeedback ? (
        <FormModal setOpenModal={setOpenModal} openModal={openModal}>
          <GuestFeedback
            currentGuestFeedback={currentGuestFeedback[0]}
            setOpenModal={setOpenModal}
          />
        </FormModal>
      ) : (
        <FormModal setOpenModal={setOpenModal} openModal={openModal}>
          <FeedbackForm name={name} setOpenModal={setOpenModal}/>
        </FormModal>
      )}
    </ListItem>
  );
};
