import {RootStateType} from "../store";

export const selectPaymentsMoneyCollected = (state: RootStateType): number => state.payments.moneyCollected;
export const selectPaymentsTotalOrder = (state: RootStateType): number => state.payments.totalOrder;
