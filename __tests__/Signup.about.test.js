import React from 'react';
import SignupAbout from '../Signup/Signup.About';
import { fireEvent, render } from '@testing-library/react-native';

describe('Signup about', () => {
  const setSignup = jest.fn();
  const navigation = {navigate : jest.fn()};
  let renderedComponent;

  beforeEach(() => {
    renderedComponent = render( <SignupAbout setSignup={setSignup} navigation={navigation} /> );
  })

  test('snapshot', () => {
    const { toJSON } = renderedComponent;
    expect(toJSON()).toMatchSnapshot();
  }) 

  test('renders correctly', () => {
    const { getByText } = renderedComponent;
    expect(getByText('Tell us about your work..')).toBeTruthy();
  })

  test('calls signup correctly', () => {
    const { getByText } = renderedComponent;
    fireEvent(getByText('➤'), 'onPress');
    expect(setSignup).toHaveBeenCalledTimes(1);
  })
})