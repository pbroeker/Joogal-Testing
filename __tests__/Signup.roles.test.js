import React from 'react';
import Roles from '../Signup/Signup.Roles';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

describe('Signup Welcome', () => {
  const setSignup = jest.fn();
  const navigation = {navigate : jest.fn()};
  let renderedComponent;

  beforeEach(() => {
    renderedComponent = render( <Roles navigation={navigation} setSignup={setSignup} /> );
  })

  test('snapshot Roles', () => {
    const { toJSON } = renderedComponent;
    expect(toJSON()).toMatchSnapshot();
  })

  test('signup called correctly', async () => {
    const { getByText, getByTestId } = renderedComponent;
    expect(getByText('Musician')).toBeTruthy();
    fireEvent(getByText('➤'), 'onPress');
    expect(setSignup).toHaveBeenCalledTimes(1);
  })
})