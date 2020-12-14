import React from 'react';
import Artistname from '../Signup/Signup.Artistname';
import { fireEvent, render } from '@testing-library/react-native';

describe('Signup Welcome', () => {
  const setSignup = jest.fn();
  const navigation = {navigate : jest.fn()};
  let renderedComponent;

  beforeEach(() => {
    renderedComponent = render( <Artistname navigation={navigation} setSignup={setSignup} /> );
  })

  test('snapshot', () => {
    const { toJSON } =  renderedComponent;
    expect(toJSON()).toMatchSnapshot();
  })

  test('renders correctly', () => {
    const { getByText } = renderedComponent;
    expect(getByText('Do you have an artist name?')).toBeTruthy();
  })

  test('calls setSignup correctly', () => {
    const { getByText } = renderedComponent;
    fireEvent(getByText('➤'), 'onPress');
    expect(setSignup).toHaveBeenCalledTimes(1);
  })
})