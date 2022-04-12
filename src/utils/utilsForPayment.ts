//@ts-ignore
import { sample } from 'lodash';

const VEGAN_LIMIT = 0.51;
const PIZZA_TYPES = {
  VEGAN: "vegan",
  MEAT: "meat",
  CHEESE: "cheese"
};

export type PizzaLoversType = {
    isVegan: boolean;
    name: string;
}

export type CurrencyType = {
    BYN: number;
    USD: number;
    EUR: number;
}

export const getPizzaType = (pizzaLovers: PizzaLoversType[]) => {
  const vegans = pizzaLovers.filter(({ isVegan }) => isVegan).length;
  const ordinary = pizzaLovers.length;

  return vegans / ordinary > VEGAN_LIMIT
    ? sample([PIZZA_TYPES.VEGAN, PIZZA_TYPES.CHEESE])
    : PIZZA_TYPES.MEAT;
};

export const convertPrice = (native: string, currencies: CurrencyType) => {
  const [price, code] = native.split(/\s+/g);
    //@ts-ignore
  return price * currencies[code];
};

export const roundPrice = (price: number) => Math.round(price * 10) / 10;




// export const converter = (price, currency) => {
//     if (price.endsWith("USD")) {
//       return Number(price.slice(0, -4)) * currency.USD;
//     } else if (price.endsWith("EUR")) {
//       return Number(price.slice(0, -4)) * currency.EUR;
//     } else {
//       return Number(price.slice(0, -4));
//     }
//   };
  