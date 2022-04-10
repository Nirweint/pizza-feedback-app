import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {FeedbackForm} from "../FeedbackForm";

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';



describe('FeedbackForm', () => {

  const initialState = { output: 10 };
  const mockStore = configureStore();
  let store;

  test('renders add new field button', () => {
    store = mockStore(initialState);
    render(<Provider store={store}>
      <FeedbackForm name={"Alex"} setOpenModal={() => {}}/>
    </Provider>)

    expect(screen.getByText(/ADD NEW FIELD/i)).toBeInTheDocument();
  });

  test('renders correct button', () => {
    store = mockStore(initialState);
    render(<Provider store={store}>
      <FeedbackForm name={"Alex"} setOpenModal={() => {}}/>
    </Provider>)

    const cancelButton = screen.getByText(/CANCEL/i);

    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toMatchSnapshot();
    expect(cancelButton).toHaveAttribute('type', 'button');
  })

  test('renders correct user name', () => {
    store = mockStore(initialState);
    render(<Provider store={store}>
      <FeedbackForm name={"Alex"} setOpenModal={() => {}}/>
    </Provider>)
    expect(screen.getByText(/Alex/i)).toBeInTheDocument();

    render(<Provider store={store}>
      <FeedbackForm name={"Andrey V"} setOpenModal={() => {}}/>
    </Provider>)
    expect(screen.getByText(/Andrey V/i)).toBeInTheDocument();
  })

  test('renders all inputs', () => {
    store = mockStore(initialState);
    render(<Provider store={store}>
      <FeedbackForm name={"Alex"} setOpenModal={() => {}}/>
    </Provider>)

    const phoneInput = screen.getByLabelText(/phone/i);
    const commentInput = screen.getByLabelText(/comment/i);
    const rating = screen.getByDisplayValue(/3/i);

    expect(phoneInput).toBeInTheDocument();
    expect(commentInput).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
  })

  test('correct default value in rating input', () => {
    store = mockStore(initialState);
    render(<Provider store={store}>
      <FeedbackForm name={"Alex"} setOpenModal={() => {}}/>
    </Provider>)

    const rating = screen.getByDisplayValue(/3/i);

    expect(rating).toBeInTheDocument();
    expect(rating).toHaveAttribute('value', '3')
    expect(rating).toMatchSnapshot();
  })

  test('adding inputs on addNewField click', () => {
    store = mockStore(initialState);
    render(<Provider store={store}>
      <FeedbackForm name={"Alex"} setOpenModal={() => {}}/>
    </Provider>)
    const addNewFieldButton = screen.getByText(/ADD NEW FIELD/i);

    userEvent.click(addNewFieldButton)
    userEvent.click(addNewFieldButton)

    expect(addNewFieldButton).toBeInTheDocument();
    expect(screen.getAllByTestId('empty-input').length).toBe(2);

    userEvent.click(addNewFieldButton)

    expect(screen.getAllByTestId('empty-input').length).toBe(3);

  })

  test('new inputs must be on top of the form', () => {
    store = mockStore(initialState);
    render(<Provider store={store}>
      <FeedbackForm name={"Alex"} setOpenModal={() => {}}/>
    </Provider>)
    const addNewFieldButton = screen.getByText(/ADD NEW FIELD/i);

    userEvent.click(addNewFieldButton)
    expect(addNewFieldButton).toBeInTheDocument();
    expect(screen.getAllByTestId('empty-input').length).toBe(1);
    const firstInputId = screen.getByTestId('empty-input').getAttribute('id');

    userEvent.click(addNewFieldButton);

    expect(screen.getAllByTestId('empty-input').length).toBe(2);
    expect(screen.getAllByTestId('empty-input')[1].getAttribute('id')).toBe(firstInputId);
  })

})