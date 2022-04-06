import React, { useEffect, useState } from "react";

import { Button, Grid, Typography, List } from "@mui/material";
import {GuestDietType, PartyGuestType} from "../../types";
import {
  clearLocalStorage,
  getLocalStorageState,
  setLocalStorageState
} from "../../localStorage";
import {GuestItem} from "./GuestItem";
import {createRequestTextForDiets} from "../../utils";
import {api} from "../../api";


export const FeedbackWidget = () => {
  const [guests, setGuests] = useState<PartyGuestType[]>([]);
  const [diet, setDiet] = useState<GuestDietType[]>([]);
  const [appInitialized, setAppInitialized] = useState<boolean>(false);
  const [openList, setOpenList] = useState<boolean>(true);

  const guestsFromLocalStorage = getLocalStorageState<PartyGuestType[]>(
    "guests",
    []
  );
  const dietFromLocalStorage = getLocalStorageState<GuestDietType[]>(
    "diet",
    []
  );

  const handleGuestsListClick = () => {
    setOpenList(!openList);
  };

  const onClearAppClick = () => {
    clearLocalStorage();
    setAppInitialized(false);
  };

  useEffect(() => {
    if (
      guestsFromLocalStorage.length === 0 ||
      dietFromLocalStorage.length === 0
    ) {
      api
        .getPartyGuests()
        .then((res) => {
          const guests = res.data.party;
          setLocalStorageState("guests", guests);
          setGuests(guests);
          return guests;
        })
        .then((res) => {
          api.checkGuestsDiet(createRequestTextForDiets(res)).then((res) => {
            setLocalStorageState("diet", res.data.diet);
            setDiet(res.data.diet);
            setAppInitialized(true);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setGuests(guestsFromLocalStorage);
      setDiet(dietFromLocalStorage);
      setAppInitialized(true);
    }
  }, [appInitialized]);

  if (!appInitialized) {
    return <div>Loading</div>;
  }

  return (
    <Grid container>
      <Grid
        item
        sx={{
          width: "100%",
          maxWidth: 200,
          bgcolor: "background.paper",
          margin: 2
        }}
      >
        <Typography>Guests list</Typography>
        <List component="div" disablePadding>
          {guests.map(({ name, eatsPizza }, index) => {
            const guestDiet = diet.find((guest) => guest.name === name);

            return (
              <GuestItem
                key={index}
                name={name}
                eatsPizza={eatsPizza}
                guestDiet={guestDiet}
                handleGuestsListClick={handleGuestsListClick}
              />
            );
          })}
        </List>
        <Button
          variant={"outlined"}
          color={"error"}
          onClick={onClearAppClick}
        >
          Clear app
        </Button>
      </Grid>
    </Grid>
  );
}