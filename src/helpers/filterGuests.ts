import {FilterOptions} from "../components/feedBack/FeedbackWidget";

import {GuestDietType, PartyGuestType} from "../types";

export const filterGuests = (guests: PartyGuestType[], diet: GuestDietType[], filter: string): PartyGuestType[] => {
  switch (filter) {
    case FilterOptions.vegans:
      return guests.filter(({name, eatsPizza}) => {
        const guestDiet = diet.find((guest) => guest.name === name);
        return guestDiet?.isVegan && eatsPizza;
      })
    case FilterOptions.meat:
      return guests.filter(({name, eatsPizza}) => {
        const guestDiet = diet.find((guest) => guest.name === name);
        return !guestDiet?.isVegan && eatsPizza;
      })
    case FilterOptions.active:
      return guests.filter(({name, eatsPizza}) => {
        return eatsPizza;
      })
    default:
      return guests;
  }
}