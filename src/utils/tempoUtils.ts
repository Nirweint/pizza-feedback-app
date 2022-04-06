import {PartyGuestType} from "../types";

export const getNumberOfEaters = (guests: PartyGuestType[]) => {
  return guests.reduce((acc, person) => {
    if (person.eatsPizza) {
      acc = acc + 1;
    }
    return acc;
  }, 0);
};