import React from 'react';
import Final from '../Signup/Signup.Final';
import { fireEvent, render } from '@testing-library/react-native';

describe('Signup final', () => {
  const setSignup = jest.fn();
  const navigation = {navigate : jest.fn()};
  const submitSignup = jest.fn();
  let renderedComponent;

  beforeEach(() => {
    renderedComponent = render( <Final navigation={navigation} setSignup={setSignup} submitSignup={submitSignup} /> ); 
  })

  test('snapshot', () => {
    const { toJSON } = renderedComponent;
    expect(toJSON()).toMatchSnapshot();
  })

  test('calls submitSignup correctly', () => {
    const { getByText } = renderedComponent;
    fireEvent(getByText('Continue'), 'onPress');
    expect(submitSignup).toHaveBeenCalledTimes(1);
  })
})

