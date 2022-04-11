import {put, takeEvery, call} from 'redux-saga/effects'

import {
  PAYMENTS_ACTIONS_TYPE,
  setIsLoadingAC,
  setPaymentsGuestsAC,
  setPizzaAC
} from "../reducers/payments";
import {getGuests, getPizza} from "../../api";
import {getPizzaType} from "../../utils/utilsForPayment";

import {PartyGuestType} from "../../types";

function* fetchGuestsDataPaymentsWorker() {
  try {
    yield put(setIsLoadingAC(true))
    const guests: PartyGuestType[] = yield call(getGuests);

    yield put(setPaymentsGuestsAC(guests))
    const lovers = guests.filter(({eatsPizza}) => eatsPizza);

    // @ts-ignore
    const pizza = yield call(getPizza, getPizzaType(lovers), lovers.length)
    yield put(setPizzaAC(pizza))
    yield put(setIsLoadingAC(false));
  } catch (e) {
    console.log(e)
  }
}

export function* paymentsWatcher() {
  yield takeEvery(PAYMENTS_ACTIONS_TYPE.FETCH_PAYMENTS_DATA, fetchGuestsDataPaymentsWorker)
}