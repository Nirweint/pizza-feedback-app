import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {
    clearLocalStorage,
    getLocalStorageState,
    removeFromLocalStorage,
    setLocalStorageState
} from "../localStorage";

export const LocalTest = () => {
    const dispatch = useDispatch();


    const [value, setValue] = useState<number>(0)

    const save = () => {
        setLocalStorageState<number>('inc', value)
    }
    const restore = () => {
        setValue(getLocalStorageState<number>('inc', 0))
    }

    const incHandler = () => {
        setValue(value + 1)
    }

    const remove = () => {
        removeFromLocalStorage('inc')
    }

    return (
        <div>
            <h1>Localstorage</h1>
            <h1>{value}</h1>
            <button onClick={incHandler}>inc</button>
            <button onClick={save}>setToLocalstorage</button>
            <button onClick={restore}>getFromLocalstorage</button>
            <button onClick={clearLocalStorage}>clearLocalstorage</button>
            <button onClick={remove}>removeFromLocalstorage</button>
        </div>
    );
};