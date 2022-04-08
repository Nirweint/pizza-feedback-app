export enum PAYMENTS_ACTIONS_TYPE {
  SET_MONEY_COLLECTED = 'paymentsReducer/SET_MONEY_COLLECTED',
  SET_TOTAL_ORDER = 'paymentsReducer/SET_TOTAL_ORDER',
}

export type PaymentsActionsType = SetMoneyCollectedACType | SetTotalOrderACType;

type PaymentsStateType = {
  moneyCollected: number;
  totalOrder: number;
}

const initialState: PaymentsStateType = {
  moneyCollected: 0,
  totalOrder: 0,
}

export const paymentsReducer = (state = initialState, action: PaymentsActionsType): PaymentsStateType => {
  switch (action.type) {
    case PAYMENTS_ACTIONS_TYPE.SET_MONEY_COLLECTED: {
      return {...state, moneyCollected: action.payload}
    }
    case PAYMENTS_ACTIONS_TYPE.SET_TOTAL_ORDER: {
      return {...state, totalOrder: action.payload}
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