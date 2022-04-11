import {all} from 'redux-saga/effects';
import {feedbackWatcher} from "./feedback";

export function* rootWatcher() {
  yield all([feedbackWatcher()])
}