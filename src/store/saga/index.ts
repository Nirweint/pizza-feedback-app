import {all} from 'redux-saga/effects';
import {feedbackWatcher} from "./feedback";
import {paymentsWatcher} from "./payments";

export function* rootWatcher() {
  yield all([feedbackWatcher(), paymentsWatcher()])
}