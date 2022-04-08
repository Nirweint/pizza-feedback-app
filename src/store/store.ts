import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction} from "redux-thunk";
import {FeedbackActionsType, feedbackReducer} from "./reducers/feedback";
import {PaymentsActionsType, paymentsReducer} from "./reducers/payments";

const rootReducer = combineReducers({
  feedback: feedbackReducer,
  payments: paymentsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootStateType = ReturnType<typeof rootReducer>

export type ThunkType = ThunkAction<void, RootStateType, unknown, RootActionsType>

export type RootActionsType = FeedbackActionsType | PaymentsActionsType;