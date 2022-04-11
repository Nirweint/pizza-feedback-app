import {FeedbackType, GuestDietType, PartyGuestType} from "../../types";

export enum FEEDBACK_ACTIONS_TYPE {
  SET_FEEDBACK = 'feedbackReducer/SET_FEEDBACK',
  SET_GUESTS = 'feedbackReducer/SET_GUESTS',
  SET_FEEDBACK_INITIALIZED = 'feedbackReducer/SET_FEEDBACK_INITIALIZED',
  SET_DIET = 'feedbackReducer/SET_DIET',
  FETCH_GUESTS_DATA = 'feedbackReducer/FETCH_GUESTS_DATA',
}

export type FeedbackActionsType =
  SetFeedbackACType
  | SetGuestsACType
  | FetchGuestsDataACType
  | SetDietACType
  | SetFeedbackInitializedACType;

type FeedbackStateType = {
  feedback: FeedbackType[];
  guests: PartyGuestType[];
  diet: GuestDietType[];
  isFeedbackInitialized: boolean;
}

const initialState: FeedbackStateType = {
  feedback: [],
  guests: [],
  diet: [],
  isFeedbackInitialized: false,
}


export const feedbackReducer = (state = initialState, action: FeedbackActionsType): FeedbackStateType => {
  switch (action.type) {
    case FEEDBACK_ACTIONS_TYPE.SET_FEEDBACK: {
      return {...state, feedback: action.payload}
    }
    case FEEDBACK_ACTIONS_TYPE.SET_GUESTS: {
      return {...state, guests: action.payload}
    }
    case FEEDBACK_ACTIONS_TYPE.SET_DIET: {
      return {...state, diet: action.payload}
    }
    case FEEDBACK_ACTIONS_TYPE.SET_FEEDBACK_INITIALIZED:
      return {...state, isFeedbackInitialized: action.payload}
    default: {
      return state;
    }
  }
}


export type SetFeedbackACType = ReturnType<typeof setFeedbackAC>
export const setFeedbackAC = (payload: FeedbackType[]) => {
  return {
    type: FEEDBACK_ACTIONS_TYPE.SET_FEEDBACK,
    payload,
  } as const
}

export type SetGuestsACType = ReturnType<typeof setGuestsAC>
export const setGuestsAC = (payload: PartyGuestType[]) => {
  return {
    type: FEEDBACK_ACTIONS_TYPE.SET_GUESTS,
    payload,
  } as const
}

export type SetDietACType = ReturnType<typeof setDietAC>
export const setDietAC = (payload: GuestDietType[]) => {
  return {
    type: FEEDBACK_ACTIONS_TYPE.SET_DIET,
    payload,
  } as const
}

export type SetFeedbackInitializedACType = ReturnType<typeof setFeedbackInitializedAC>
export const setFeedbackInitializedAC = (payload: boolean) => {
  return {
    type: FEEDBACK_ACTIONS_TYPE.SET_FEEDBACK_INITIALIZED,
    payload,
  } as const
}

export type FetchGuestsDataACType = ReturnType<typeof fetchGuestsDataAC>
export const fetchGuestsDataAC = () => {
  return {
    type: FEEDBACK_ACTIONS_TYPE.FETCH_GUESTS_DATA,
  } as const
}