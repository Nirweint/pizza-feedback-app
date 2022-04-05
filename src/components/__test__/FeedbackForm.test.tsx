import React from 'react';
import renderer from 'react-test-renderer';
import {FeedbackForm} from "../FeedbackForm";

test('renders correctly', () => {
  const component = renderer.create(<FeedbackForm name={"Alex"} setOpenModal={()=>{}}/>);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // if (tree && "props" in tree) {
  //   tree && tree.props.handleCreateNewFieldClick();
  // }
  //
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();

});