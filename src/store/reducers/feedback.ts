import {FeedbackType, PartyGuestType} from "../../types";

export enum FEEDBACK_ACTIONS_TYPE {
  SET_FEEDBACK = 'feedbackReducer/SET_FEEDBACK',
  SET_GUESTS = 'feedbackReducer/SET_GUESTS',
}

export type FeedbackActionsType = SetFeedbackACType | SetGuestsACType;

type FeedbackStateType = {
  feedback: FeedbackType[];
  guests: PartyGuestType[]
}

const initialState: FeedbackStateType = {
  feedback: [],
  guests: [],
}


export const feedbackReducer = (state = initialState, action: FeedbackActionsType): FeedbackStateType => {
  switch (action.type) {
    case FEEDBACK_ACTIONS_TYPE.SET_FEEDBACK: {
      return {...state, feedback: action.payload}
    }
    case FEEDBACK_ACTIONS_TYPE.SET_GUESTS: {
      return {...state, guests: action.payload}
    }
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
