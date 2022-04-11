import {PartyGuestType, PizzaType} from "../../types";

export enum PAYMENTS_ACTIONS_TYPE {
  SET_MONEY_COLLECTED = 'paymentsReducer/SET_MONEY_COLLECTED',
  SET_TOTAL_ORDER = 'paymentsReducer/SET_TOTAL_ORDER',
  SET_IS_LOADING = 'paymentsReducer/SET_IS_LOADING',
  SET_GUESTS = 'paymentsReducer/SET_GUESTS',
  SET_PIZZA = 'paymentsReducer/SET_PIZZA',
  FETCH_PAYMENTS_DATA = 'paymentsReducer/FETCH_PAYMENTS_DATA',
}

export type PaymentsActionsType =
  SetMoneyCollectedACType
  | SetTotalOrderACType
  | SetIsLoadingACType
  | SetPaymentsGuestsACType
  | SetPizzaACType
  | FetchPaymentsDataACType;

type PaymentsStateType = {
  moneyCollected: number;
  totalOrder: number;
  isLoading: boolean;
  guests: PartyGuestType[];
  pizza: PizzaType;
}

const initialState: PaymentsStateType = {
  moneyCollected: 0,
  totalOrder: 0,
  isLoading: false,
  guests: [],
  pizza: {
    type: '',
    price: '',
    name: '',
  },
}

export const paymentsReducer = (state = initialState, action: PaymentsActionsType): PaymentsStateType => {
  switch (action.type) {
    case PAYMENTS_ACTIONS_TYPE.SET_MONEY_COLLECTED: {
      return {...state, moneyCollected: action.payload}
    }
    case PAYMENTS_ACTIONS_TYPE.SET_TOTAL_ORDER: {
      return {...state, totalOrder: action.payload}
    }
    case PAYMENTS_ACTIONS_TYPE.SET_IS_LOADING: {
      return {...state, isLoading: action.payload}
    }
    case PAYMENTS_ACTIONS_TYPE.SET_GUESTS: {
      return {...state, guests: action.payload}
    }
    case PAYMENTS_ACTIONS_TYPE.SET_PIZZA: {
      return {...state, pizza: {...action.payload}}
    }
    default: {
      return state;
    }
  }
}

export type SetMoneyCollectedACType = ReturnType<typeof setMoneyCollectedAC>
export const setMoneyCollectedAC = (payload: number) => {
  return {
    type: PAYMENTS_ACTIONS_TYPE.SET_MONEY_COLLECTED,
    payload,
  } as const
}

export type SetTotalOrderACType = ReturnType<typeof setTotalOrderAC>
export const setTotalOrderAC = (payload: number) => {
  return {
    type: PAYMENTS_ACTIONS_TYPE.SET_TOTAL_ORDER,
    payload,
  } as const
}

export type SetIsLoadingACType = ReturnType<typeof setIsLoadingAC>
export const setIsLoadingAC = (payload: boolean) => {
  return {
    type: PAYMENTS_ACTIONS_TYPE.SET_IS_LOADING,
    payload,
  } as const
}

export type SetPaymentsGuestsACType = ReturnType<typeof setPaymentsGuestsAC>
export const setPaymentsGuestsAC = (payload: PartyGuestType[]) => {
  return {
    type: PAYMENTS_ACTIONS_TYPE.SET_GUESTS,
    payload,
  } as const
}

export type SetPizzaACType = ReturnType<typeof setPizzaAC>
export const setPizzaAC = (payload: any) => {
  return {
    type: PAYMENTS_ACTIONS_TYPE.SET_PIZZA,
    payload,
  } as const
}

export type FetchPaymentsDataACType = ReturnType<typeof fetchPaymentsDataAC>
export const fetchPaymentsDataAC = () => {
  return {
    type: PAYMENTS_ACTIONS_TYPE.FETCH_PAYMENTS_DATA,
  } as const
}