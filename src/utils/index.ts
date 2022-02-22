import {PartyGuestType} from "../store/reducer";

export const createRequestTextForDiets = (guests: PartyGuestType[]) => {
    const res = guests.reduce((acc, guest) => {
        const guestString = guest.name.split(' ').join('%20')
        return acc = acc + guestString + ','
    }, '')
    return res.slice(0, -1)
}