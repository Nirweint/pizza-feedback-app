export const setLocalStorageState = <T>(key: string, state: T) => {
    const stateAsString = JSON.stringify(state)
    localStorage.setItem(key, stateAsString)
}

export const getLocalStorageState = <T>(key: string, defaultState: T) => {
    let state = defaultState
    const stateAsString = localStorage.getItem(key)
    if (stateAsString !== null) state = JSON.parse(stateAsString) as T
    return state
}

export const clearLocalStorage = () => {
    localStorage.clear()
}