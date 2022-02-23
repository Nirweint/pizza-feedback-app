import axios from "axios";
import {GuestDietType, PartyGuestType} from "../types";

const baseURL = 'https://gp-js-test.herokuapp.com/pizza';

const instance = axios.create({baseURL});

export const api = {
    getPartyGuests() {
        return instance.get<PartyGuestsResponseType>(`${baseURL}/guests`)
    },
    checkGuestsDiet(names: string) {
        return instance.get<GuestDietResponseType>(`${baseURL}/world-diets-book/${names}`)
    },
}


type PartyGuestsResponseType = {
    party: PartyGuestType[]
}

type GuestDietResponseType = {
    diet: GuestDietType[]
}