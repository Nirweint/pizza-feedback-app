import React, {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {Button, Grid, List, Typography} from "@mui/material";

import {GuestItem} from "./GuestItem";
import {DropDownMenu} from "../common/dropDownMenu/DropDownMenu";
import {clearLocalStorage, getLocalStorageState} from "../../localStorage";
import {
  fetchGuestsDataAC,
  setDietAC,
  setFeedbackAC,
  setFeedbackInitializedAC,
  setGuestsAC
} from "../../store/reducers/feedback";
import {
  selectDiet,
  selectGuests,
  selectIsFeedbackInitialized
} from "../../store/selectors/feedback";
import {
  FEEDBACK_CLEAR_BUTTON_TEXT,
  FEEDBACK_WIDGET_TITLE_TEXT
} from "../../wordsList/feedbackWidgetWordsList";
import {filterGuests} from "../../helpers/filterGuests";

import {FeedbackType, GuestDietType, PartyGuestType} from "../../types";

export enum FilterOptions {
  all = 'All',
  vegans = 'Vegans',
  meat = 'Meat',
  active = 'Active',
}

const filterOptions = [
  FilterOptions.all,
  FilterOptions.vegans,
  FilterOptions.meat,
  FilterOptions.active
];

export const FeedbackWidget = () => {
  const dispatch = useDispatch()

  const guests = useSelector(selectGuests);
  const diet = useSelector(selectDiet);
  const isFeedbackInitialized = useSelector(selectIsFeedbackInitialized);

  const [openList, setOpenList] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>(FilterOptions.all);

  const guestsFromLocalStorage = getLocalStorageState<PartyGuestType[]>(
    "guests",
    []
  );
  const dietFromLocalStorage = getLocalStorageState<GuestDietType[]>(
    "diet",
    []
  );
  const feedbacksFromLocalStorage = getLocalStorageState<FeedbackType[]>(
    "feedback",
    []
  );

  const handleGuestsListClick = () => {
    setOpenList(!openList);
  };

  const handleFilterChange = (filterValue: string) => {
    setFilter(filterValue);
  };

  const handleClearAppClick = () => {
    clearLocalStorage();
    setFilter(FilterOptions.all)
    dispatch(setFeedbackInitializedAC(false));
  };

  useEffect(() => {
    if (
      guestsFromLocalStorage.length === 0 ||
      dietFromLocalStorage.length === 0
    ) {
        dispatch(fetchGuestsDataAC())
    } else {
      dispatch(setGuestsAC(guestsFromLocalStorage))
      dispatch(setDietAC(dietFromLocalStorage))
      dispatch(setFeedbackAC(feedbacksFromLocalStorage))
      dispatch(setFeedbackInitializedAC(true))
    }
  }, [isFeedbackInitialized]);

  const filteredGuests = filterGuests(guests, diet, filter);

  if (!isFeedbackInitialized) {
    return <div>Loading</div>;
  }

  return (
    <Grid container flexDirection='column'>
      <Grid item alignSelf='flex-end'>
        <DropDownMenu
          options={filterOptions}
          value={filter}
          onChange={handleFilterChange}
        />
      </Grid>
      <Grid
        item
        sx={{
          width: "100%",
          maxWidth: 200,
          bgcolor: "background.paper",
          margin: 2
        }}
      >
        <Typography>{FEEDBACK_WIDGET_TITLE_TEXT}</Typography>
        <List component="div" disablePadding>
          {filteredGuests.map(({name, eatsPizza}, index) => {
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
          onClick={handleClearAppClick}
        >
          {FEEDBACK_CLEAR_BUTTON_TEXT}
        </Button>
      </Grid>
    </Grid>
  );
}