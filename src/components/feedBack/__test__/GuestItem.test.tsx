import { render, screen } from '@testing-library/react';
import React from "react";
import {GuestItem} from "../GuestItem";

describe('GuestItem', () => {

  test('if person is vegan, his name must be green', () => {
    render(<GuestItem
      name='Alex'
      eatsPizza={true}
      guestDiet={{name: 'Alex', isVegan: true}}
      handleGuestsListClick={() => {
      }}/>);

    expect(screen.getByTestId('name-text')).toHaveStyle('color: green;')
  })


  test('if person dont eat pizza, his li must be disabled', () => {
    render(<GuestItem
      name='Alex'
      eatsPizza={false}
      guestDiet={{name: 'Alex', isVegan: true}}
      handleGuestsListClick={() => {
      }}/>);

    expect(screen.getByTestId('name-wrapper').getAttribute('aria-disabled')).toBe('true')
  })

  test('renders correctly', () => {
    const {asFragment} = render(<GuestItem
      name='Alex'
      eatsPizza={true}
      guestDiet={{name: 'Alex', isVegan: true}}
      handleGuestsListClick={() => {
      }}/>);

    expect(asFragment()).toMatchSnapshot();
  })

})
