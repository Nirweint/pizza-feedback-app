import {put, call, select, takeLatest} from 'redux-saga/effects'
import {AxiosResponse} from "axios";

import {api, GuestDietResponseType, PartyGuestsResponseType} from "../../api";
import {
  FEEDBACK_ACTIONS_TYPE,
  setDietAC,
  setFeedbackInitializedAC,
  setGuestsAC
} from "../reducers/feedback";
import {selectGuests} from "../selectors/feedback";
import {setLocalStorageState} from "../../localStorage";
import {createRequestTextForDiets} from "../../utils";

import {PartyGuestType} from "../../types";

function* fetchPartyGuests() {
  try {
    const guestsResponse: AxiosResponse<PartyGuestsResponseType> = yield call(api.getPartyGuests)
    const guests: PartyGuestType[] = guestsResponse.data.party

    yield put(setGuestsAC(guests))
    setLocalStorageState("guests", guests);
  } catch (e) {
    console.log(e)
  }
}

function* fetchGuestsDiet() {
  try {
    const guests:PartyGuestType[]  = yield select(selectGuests)

    const diet: AxiosResponse<GuestDietResponseType> =
      yield call(api.checkGuestsDiet, createRequestTextForDiets(guests))

    yield put(setDietAC(diet.data.diet))
    setLocalStorageState("diet", diet.data.diet);

  } catch (e) {
    console.log(e)
  }
}

function* fetchGuestsDataWorker() {
  try{
    yield call(fetchPartyGuests)
    yield call(fetchGuestsDiet)

    yield put(setFeedbackInitializedAC(true))
  } catch (e) {
    yield put(setFeedbackInitializedAC(false))
  }
}

export function* feedbackWatcher() {
  yield takeLatest(FEEDBACK_ACTIONS_TYPE.FETCH_GUESTS_DATA, fetchGuestsDataWorker)
}