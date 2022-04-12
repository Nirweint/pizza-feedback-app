import {RootStateType} from "../store";
import {PartyGuestType, PizzaType} from "../../types";
import {CurrencyType} from "../../utils/utilsForPayment";

export const selectPaymentsMoneyCollected = (state: RootStateType): number => state.payments.moneyCollected;
export const selectPaymentsTotalOrder = (state: RootStateType): number => state.payments.totalOrder;
export const selectPaymentsIsLoading = (state: RootStateType): boolean => state.payments.isLoading;
export const selectPaymentsGuests = (state: RootStateType): PartyGuestType[] => state.payments.guests;
export const selectPaymentsPizza = (state: RootStateType): PizzaType => state.payments.pizza;
export const selectPaymentsCurrency = (state: RootStateType): CurrencyType => state.payments.currency;
