import {FeedbackType} from "../../types";

export enum FEEDBACK_ACTIONS_TYPE {
  SET_FEEDBACK = 'feedbackReducer/SET_FEEDBACK',
}

export type FeedbackActionsType = SetFeedbackACType;

type FeedbackStateType = {
  feedback: FeedbackType[]
}

const initialState: FeedbackStateType = {
  feedback: [],
}


export const feedbackReducer = (state = initialState, action: FeedbackActionsType): FeedbackStateType => {
  switch (action.type) {
    case FEEDBACK_ACTIONS_TYPE.SET_FEEDBACK: {
      return {...state, feedback: action.payload}
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
