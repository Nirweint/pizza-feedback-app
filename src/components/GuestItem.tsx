import React from 'react';
import {ListItem, ListItemButton, ListItemText} from "@mui/material";
import {GuestDietType} from "../store/reducer";
import {FeedbackForm} from "./FeedbackForm";
import {FormModal} from "./FormModal";

type GuestItemPropsType = {
    name: string
    eatsPizza: boolean
    guestDiet?: GuestDietType
    handleGuestsListClick: () => void
}

export const GuestItem = ({guestDiet, eatsPizza, name, handleGuestsListClick}: GuestItemPropsType) => {

    const [openModal, setOpenModal] = React.useState<boolean>(false);

    const handleGuestClick = () => {
        handleGuestsListClick()
        setOpenModal(true)
    }

    return (
        <ListItem disablePadding>
            <ListItemButton disabled={!eatsPizza} onClick={handleGuestClick}>
                <ListItemText
                    primary={name}
                    style={{color: `${guestDiet && guestDiet.isVegan && eatsPizza ? 'green' : ''}`}}
                />
            </ListItemButton>
            <FormModal
                setOpenModal={setOpenModal}
                openModal={openModal}
            >
                <FeedbackForm name={name}/>
            </FormModal>
        </ListItem>
    );
};