import axios from "axios";
import { GuestDietType, PartyGuestType } from "../types";

const baseURL = "https://gp-js-test.herokuapp.com/pizza";

const instance = axios.create({ baseURL });

export const api = {
  getPartyGuests() {
    return instance.get<PartyGuestsResponseType>(`/guests`);
  },
  checkGuestsDiet(names: string) {
    return instance.get<GuestDietResponseType>(
      `/world-diets-book/${names}`
    );
  }
};

type PartyGuestsResponseType = {
  party: PartyGuestType[];
};

type GuestDietResponseType = {
  diet: GuestDietType[];
};
