import React from 'react';
import { render, cleanup } from '@testing-library/react';

import {FeedbackForm} from "../FeedbackForm";

afterEach(cleanup);

test('FeedbackForm renders correctly', () => {
  const { asFragment }= render(<FeedbackForm name={"Alex"} setOpenModal={()=>{}}/>);

  expect(asFragment()).toMatchSnapshot();
});