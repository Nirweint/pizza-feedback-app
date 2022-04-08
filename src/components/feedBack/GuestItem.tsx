import React, {useState} from "react";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";

import {FeedbackForm} from "./FeedbackForm";
import {GuestFeedback} from "./GuestFeedback";
import {FormModal} from './FormModal';
import {FeedbackPopover} from "../feedbackPopover/FeedbackPopover";
import {getLocalStorageState} from "../../localStorage";

import {FeedbackType, GuestDietType} from "../../types";

type GuestItemPropsType = {
  name: string;
  eatsPizza: boolean;
  guestDiet?: GuestDietType;
  handleGuestsListClick: () => void;
};

export const GuestItem = (props: GuestItemPropsType) => {
  const {guestDiet, eatsPizza, name, handleGuestsListClick} = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const [openModal, setOpenModal] = useState<boolean>(false);

  const feedbacksFromLocalStorage = getLocalStorageState<FeedbackType[]>(
    "feedback",
    []
  );

  const currentGuestFeedback = feedbacksFromLocalStorage.filter(
    (guest) => guest.name === name
  );

  const handleGuestClick = () => {
    handleGuestsListClick();
    setOpenModal(true);
  };

  const open = Boolean(anchorEl);

  return (
    <ListItem disablePadding>
      <ListItemButton data-testid='name-wrapper' disabled={!eatsPizza}
                      onClick={handleGuestClick}
                      aria-owns={open ? 'mouse-over-popover' : undefined}
                      aria-haspopup="true"
                      onMouseEnter={handlePopoverOpen}
                      onMouseLeave={handlePopoverClose}
      >
        {currentGuestFeedback.length !== 0 && (
          <ListItemIcon sx={{minWidth: 25}}>✅</ListItemIcon>
        )}
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
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{p: 1}}>
          {currentGuestFeedback.length === 0 ? (
              <Typography>The user has not entered data yet</Typography>
            )
            :
            (
              <FeedbackPopover
                currentGuestFeedback={currentGuestFeedback[0]}
              />
            )}

        </Typography>
      </Popover>
      {currentGuestFeedback.length === 0 ? (
        <FormModal setOpenModal={setOpenModal} openModal={openModal}>
          <FeedbackForm name={name} setOpenModal={setOpenModal}/>
        </FormModal>
      ) : (
        <FormModal setOpenModal={setOpenModal} openModal={openModal}>
          <GuestFeedback
            currentGuestFeedback={currentGuestFeedback[0]}
            setOpenModal={setOpenModal}
          />
        </FormModal>
      )}
    </ListItem>
  );
};
