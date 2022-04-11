import {RootStateType} from "../store";
import {PartyGuestType, PizzaType} from "../../types";

export const selectPaymentsMoneyCollected = (state: RootStateType): number => state.payments.moneyCollected;
export const selectPaymentsTotalOrder = (state: RootStateType): number => state.payments.totalOrder;
export const selectPaymentsIsLoading = (state: RootStateType): boolean => state.payments.isLoading;
export const selectPaymentsGuests = (state: RootStateType): PartyGuestType[] => state.payments.guests;
export const selectPaymentsPizza = (state: RootStateType): PizzaType => state.payments.pizza;
