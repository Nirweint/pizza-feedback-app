import React from 'react';
import renderer from 'react-test-renderer';
import {GuestFeedback} from "../GuestFeedback";

const mockData = {
  name: 'Alex',
  rating: 4,
  phone: '22222',
  comment: 'Hello'
}

test('GuestFeedback renders correctly', () => {
  const component = renderer.create(<GuestFeedback currentGuestFeedback={mockData} setOpenModal={() => {}}/>);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});