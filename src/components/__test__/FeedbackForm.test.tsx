import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import { FeedbackForm } from "../FeedbackForm";

describe('FeedbackForm', () => {

  test('renders add new field button', () => {
    render(<FeedbackForm name={"Alex"} setOpenModal={() => {}}/>)

    expect(screen.getByText(/ADD NEW FIELD/i)).toBeInTheDocument();
  });

  test('renders correct button', () => {
    render(<FeedbackForm name={'Alex'} setOpenModal={() => {}}/>)

    const cancelButton = screen.getByText(/CANCEL/i);

    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toMatchSnapshot();
    expect(cancelButton).toHaveAttribute('type', 'button');
  })

  test('renders correct user name', () => {
    render(<FeedbackForm name={'Alex'} setOpenModal={() => {}}/>)
    expect(screen.getByText(/Alex/i)).toBeInTheDocument();

    render(<FeedbackForm name={'Andrey V'} setOpenModal={() => {}}/>)
    expect(screen.getByText(/Andrey V/i)).toBeInTheDocument();
  })

  test('renders all inputs', () => {
    render(<FeedbackForm name={'Alex'} setOpenModal={() => {}}/>)

    const phoneInput = screen.getByLabelText(/phone/i);
    const commentInput = screen.getByLabelText(/comment/i);
    const rating = screen.getByDisplayValue(/3/i);

    expect(phoneInput).toBeInTheDocument();
    expect(commentInput).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
  })

  test('correct default value in rating input', () => {
    render(<FeedbackForm name={'Alex'} setOpenModal={() => {}}/>)

    const rating = screen.getByDisplayValue(/3/i);

    expect(rating).toBeInTheDocument();
    expect(rating).toHaveAttribute('value', '3')
    expect(rating).toMatchSnapshot();
  })

  test('adding inputs on addNewField click', () => {
    render(<FeedbackForm name={'Alex'} setOpenModal={() => {}}/>)
    const addNewFieldButton = screen.getByText(/ADD NEW FIELD/i);

    userEvent.click(addNewFieldButton)
    userEvent.click(addNewFieldButton)

    expect(addNewFieldButton).toBeInTheDocument();
    expect(screen.getAllByTestId('empty-input').length).toBe(2);

    userEvent.click(addNewFieldButton)

    expect(screen.getAllByTestId('empty-input').length).toBe(3);

  })

  test('new inputs must be on top of the form', () => {
    render(<FeedbackForm name={'Alex'} setOpenModal={() => {}}/>)
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