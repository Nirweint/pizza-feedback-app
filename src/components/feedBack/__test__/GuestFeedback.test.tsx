import React from 'react';
import renderer from 'react-test-renderer';
import {GuestFeedback} from "../GuestFeedback";

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockData = {
  name: 'Alex',
  rating: 4,
  phone: '22222',
  comment: 'Hello'
}

const initialState = { output: 10 };
const mockStore = configureStore();
let store;

test('GuestFeedback renders correctly', () => {
  store = mockStore(initialState);
  const component = renderer.create(
    <Provider store={store}>
    <GuestFeedback currentGuestFeedback={mockData} setOpenModal={() => {}}/>
    </Provider>);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});