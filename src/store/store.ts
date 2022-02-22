import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {AppActionsType, appReducer} from "./reducer";

const rootReducer = combineReducers({
    app: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type ThunkType = ThunkAction<void, RootStateType, unknown, RootActionsType>

type RootActionsType = AppActionsType

export type RootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store=store