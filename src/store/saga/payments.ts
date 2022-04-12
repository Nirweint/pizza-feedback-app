import {call, fork, put, select, takeEvery} from 'redux-saga/effects'
import {AxiosResponse} from "axios";

import {
  PAYMENTS_ACTIONS_TYPE,
  setCurrencyAC,
  setIsLoadingAC,
  setPaymentsGuestsAC,
  setPizzaAC,
  setTempoGuestsAC
} from "../reducers/payments";
import {api, GuestDietResponseType, PartyGuestsResponseType} from "../../api";
import {selectGuests} from "../selectors/feedback";
import {createRequestTextForDiets} from "../../utils";
import {
  selectPaymentsCurrency,
  selectPaymentsGuests,
  selectPaymentsPizza
} from "../selectors/payments";
import {convertPrice, CurrencyType, getPizzaType} from "../../utils/utilsForPayment";

import {PartyGuestType, PizzaType} from "../../types";

function* fetchGuests() {
  try {
    const guestsResponse: AxiosResponse<PartyGuestsResponseType> = yield call(api.getPartyGuests)
    const guests: PartyGuestType[] = guestsResponse.data.party

    yield put(setTempoGuestsAC(guests))
  } catch (e) {
    console.log(e)
  }
}

function* fetchGuestsDiet() {
  try {
    const guests: PartyGuestType[] = yield select(selectGuests)

    const dietResponse: AxiosResponse<GuestDietResponseType> =
      yield call(api.checkGuestsDiet, createRequestTextForDiets(guests))
    const diet = dietResponse.data.diet;

    // @ts-ignore
    const dietMap = diet.reduce((acc: PartyGuestType, {name, isVegan} = {}) => {
      //@ts-ignore
      acc[name] = isVegan;

      return acc;
    }, {});

    const newGuests = guests.map((guest: any) => ({
      ...guest,
      //@ts-ignore
      isVegan: dietMap[guest.name]
    }));
    yield put(setPaymentsGuestsAC(newGuests))

  } catch (e) {
    console.log(e)
  }
}

function* fetchPizza() {
  try {
    const guests: PartyGuestType[] = yield select(selectPaymentsGuests)
    const lovers: any = guests.filter(({eatsPizza}) => eatsPizza);

    const pizza: AxiosResponse<PizzaType> = yield call(api.orderPizza, getPizzaType(lovers), lovers.length)
    yield put(setPizzaAC(pizza.data))

  } catch (e) {
    console.log(e)
  }
}

function* fetchCurrency() {
  const currency: AxiosResponse<CurrencyType> = yield call(api.getCurrency)
  yield put(setCurrencyAC(currency.data))
}

function* setPizza() {
  yield fork(fetchPizza)
  yield fork(fetchCurrency)
}

function* fetchPaymentsData() {
  try {
    yield put(setIsLoadingAC(true))

    yield call(fetchGuests)
    yield call(fetchGuestsDiet)
    yield call(setPizza)

    const pizza: PizzaType = yield select(selectPaymentsPizza)
    const currency: CurrencyType = yield select(selectPaymentsCurrency)

    yield put(setPizzaAC({...pizza, price: convertPrice(pizza.price, currency)}))

    yield put(setIsLoadingAC(false));
  } catch (e) {
    console.log(e)
  }
}

export function* paymentsWatcher() {
  yield takeEvery(PAYMENTS_ACTIONS_TYPE.FETCH_PAYMENTS_DATA, fetchPaymentsData)
}