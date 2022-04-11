import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {paymentsReducer} from "./reducers/payments";
import {feedbackReducer} from "./reducers/feedback";
import {rootWatcher} from "./saga";

const rootReducer = combineReducers({
  feedback: feedbackReducer,
  payments: paymentsReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

export type RootStateType = ReturnType<typeof rootReducer>;

sagaMiddleware.run(rootWatcher);