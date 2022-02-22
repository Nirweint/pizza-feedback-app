import {ThunkType} from "./store";
import {api} from "../api";
import {createRequestTextForDiets} from "../utils";

enum APP_ACTIONS {
    SET_PARTY_GUESTS = 'app/SET_PARTY_GUESTS',
    SET_GUESTS_DIET = 'app/SET_GUESTS_DIET',
}

export type AppStateType = {
    guests: PartyGuestType[]
    diet: GuestDietType[]
}

export type AppActionsType = SetPartyGuestsActionType | SetGuestsDietActionType

const initState: AppStateType = {
    guests: [],
    diet:[],
}

export const appReducer = (state = initState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case APP_ACTIONS.SET_PARTY_GUESTS:
        return {...state, guests: action.payload}
        case APP_ACTIONS.SET_GUESTS_DIET:
            return {...state, diet: action.payload}
        default:
            return state;
    }
}

// ACTIONS

export type SetPartyGuestsActionType = ReturnType<typeof setPartyGuests>
export const setPartyGuests = (payload: PartyGuestType[]) => {
    return {
        type: APP_ACTIONS.SET_PARTY_GUESTS,
        payload,
    } as const
}

export type SetGuestsDietActionType = ReturnType<typeof setGuestsDiet>
export const setGuestsDiet = (payload: GuestDietType[]) => {
    return {
        type: APP_ACTIONS.SET_GUESTS_DIET,
        payload,
    } as const
}

// THUNK

export const fetchGuests = (): ThunkType => dispatch => {
    api.getPartyGuests()
        .then(res => {
            dispatch(setPartyGuests(res.data.party))
            console.log(res.data)
        })
        .then(() => {
            dispatch(fetchGuestsDiet())
        })
}

export const fetchGuestsDiet = (): ThunkType => (dispatch, getState) => {
    const guests = getState().app.guests
    const names = createRequestTextForDiets(guests)
    api.checkGuestsDiet(names)
        .then(res => {
            dispatch(setGuestsDiet(res.data.diet))
            console.log(res.data)
        })
}

// TYPES

export type PartyGuestType = {
    name: string
    eatsPizza: boolean
}

export type GuestDietType = {
    name: string
    isVegan: boolean
}