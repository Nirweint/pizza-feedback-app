import React from 'react';

import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import {CircularProgressBar} from "../CircularProgressBar";

const mockData = {
  maxValue: 10,
  currentProgress: 5,
}

describe('CircularProgressBar', () => {

  const initialState = {};
  const mockStore = configureStore();
  let store;

  test('progress color must be orange', () => {
    store = mockStore(initialState);
    render(<Provider store={store}>
      <CircularProgressBar maxValue={mockData.maxValue}
                           currentProgress={mockData.currentProgress}/>
    </Provider>)

    expect(screen.getByTestId('circular-progress')).toBeInTheDocument();
    expect(screen.getByTestId('circular-progress')).toMatchSnapshot()

  });

  test('progress color must be red', () => {
    store = mockStore(initialState);
    render(<Provider store={store}>
      <CircularProgressBar maxValue={10}
                           currentProgress={2}/>
    </Provider>)

    expect(screen.getByTestId('circular-progress')).toMatchSnapshot()

  });

  test('progress color must be green', () => {
    store = mockStore(initialState);
    render(<Provider store={store}>
      <CircularProgressBar maxValue={10}
                           currentProgress={9}/>
    </Provider>)
    expect(screen.getByTestId('circular-progress')).toMatchSnapshot()

  });

})