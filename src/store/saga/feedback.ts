import {put, takeEvery, call, select} from 'redux-saga/effects'
import {AxiosResponse} from "axios";

import {api, GuestDietResponseType, PartyGuestsResponseType} from "../../api";
import {
  FEEDBACK_ACTIONS_TYPE,
  setDietAC,
  setFeedbackInitializedAC,
  setGuestsAC
} from "../reducers/feedback";
import {setLocalStorageState} from "../../localStorage";
import {createRequestTextForDiets} from "../../utils";
import {PartyGuestType} from "../../types";

function* fetchGuestsDataWorker() {
  try {
    const guestsResponse: AxiosResponse<PartyGuestsResponseType> = yield call(api.getPartyGuests)
    const guests: PartyGuestType[] = guestsResponse.data.party
    yield put(setGuestsAC(guests))
    setLocalStorageState("guests", guests);

    const diet: AxiosResponse<GuestDietResponseType> =
      yield call(api.checkGuestsDiet, createRequestTextForDiets(guests))
    yield put(setDietAC(diet.data.diet))
    setLocalStorageState("diet", diet.data.diet);
    yield put(setFeedbackInitializedAC(true))
  } catch (e) {
    console.log(e)
    yield put(setFeedbackInitializedAC(false))
  }
}

export function* feedbackWatcher() {
  yield takeEvery(FEEDBACK_ACTIONS_TYPE.FETCH_GUESTS_DATA, fetchGuestsDataWorker)
}