import {createRequestTextForDiets} from '../index';
import {PartyGuestType} from "../../types";

let guests: PartyGuestType[]

beforeEach(() => {
  guests = [
    {"name": "Brett George", "eatsPizza": true},
    {"name": "Tanner Holmes", "eatsPizza": true},
    {"name": "Justice Bauer", "eatsPizza": false},
  ]
})

test('createRequestTextForDiets works correctly', () => {
  const res = createRequestTextForDiets(guests)

  expect(res).toBe('Brett%20George,Tanner%20Holmes,Justice%20Bauer')
})