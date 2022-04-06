import { convertPrice } from './../utils/utilsForPayment';
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
  },
  getCurrency() {
    return instance.get(`/currency`);
  },
  orderPizza(type: string, slices: number) {
    return instance.get(`/order/${type}/${slices}`);
  },
};

type PartyGuestsResponseType = {
  party: PartyGuestType[];
};

type GuestDietResponseType = {
  diet: GuestDietType[];
};



export const PARTY_GUEST_URL = "https://gp-js-test.herokuapp.com/pizza/guests";
const BOOK_OF_DIET_URL =
  "https://gp-js-test.herokuapp.com/pizza/world-diets-book";
const ORDER_PIZZA_URL = "https://gp-js-test.herokuapp.com/pizza/order";
const CURRENCY_URL = "https://gp-js-test.herokuapp.com/pizza/currency";

export const getGuests = async () => {
  const guestsResponse = await fetch(PARTY_GUEST_URL);

  if (!guestsResponse.ok) {
    console.warn(guestsResponse);

    return;
  }

  const { party } = await guestsResponse.json();
  if (!party || !party.length) {
    console.log("Nothing to show");

    return;
  }

  const dietNames = party
  //@ts-ignore
    .filter(({ eatsPizza }) => eatsPizza)
    //@ts-ignore
    .map(({ name }) => name)
    .join(",");
  const dietsResponse = await fetch(`${BOOK_OF_DIET_URL}/${dietNames}`);

  if (!dietsResponse.ok) {
    console.warn(dietsResponse);

    return;
  }

  const { diet } = await dietsResponse.json();
  //@ts-ignore
  const dietMap = diet.reduce((acc: PartyGuestType, { name, isVegan }  = {}) => {
      //@ts-ignore
    acc[name] = isVegan;

    return acc;
  }, {});

  return party.map((guest: PartyGuestType[]) => ({
    ...guest,
    //@ts-ignore
    isVegan: dietMap[guest.name]
  }));
};
//@ts-ignore
export const getPizza = async (type, slices) => {
  const [pizzaResponse, currencyResponse] = await Promise.all([
    fetch(`${ORDER_PIZZA_URL}/${type}/${slices}`),
    fetch(CURRENCY_URL)
  ]);

  if (!pizzaResponse.ok || !currencyResponse.ok) {
    console.warn(pizzaResponse, currencyResponse);

    return;
  }

  const pizza = await pizzaResponse.json();
  const currency = await currencyResponse.json();
  return { ...pizza, price: convertPrice(pizza.price, currency) };
};
