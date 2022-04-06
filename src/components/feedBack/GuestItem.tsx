import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { FeedbackForm } from "./FeedbackForm";
import { FormModal } from './FormModal';
import {getLocalStorageState} from "../../localStorage";
import {FeedbackType, GuestDietType} from "../../types";
import {GuestFeedback} from "./GuestFeedback";

type GuestItemPropsType = {
  name: string;
  eatsPizza: boolean;
  guestDiet?: GuestDietType;
  handleGuestsListClick: () => void;
};

export const GuestItem = (props: GuestItemPropsType) => {
  const { guestDiet, eatsPizza, name, handleGuestsListClick } = props;

  const [openModal, setOpenModal] = React.useState<boolean>(false);

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

  return (
    <ListItem disablePadding>
      <ListItemButton data-testid='name-wrapper' disabled={!eatsPizza} onClick={handleGuestClick}>
        {currentGuestFeedback.length !== 0 && (
          <ListItemIcon sx={{ minWidth: 25 }}>✅</ListItemIcon>
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
      {currentGuestFeedback.length === 0 ? (
        <FormModal setOpenModal={setOpenModal} openModal={openModal}>
          <FeedbackForm name={name} setOpenModal={setOpenModal} />
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
