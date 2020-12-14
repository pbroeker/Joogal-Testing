import React from 'react';
import Welcome from '../Signup/Signup.Welcome';
import { render } from '@testing-library/react-native';

describe('Signup Welcome', () => {
  const setSignup = jest.fn();
  const navigation = {navigate : setSignup};

  test('snapshot', () => {
    const { toJSON } = render( <Welcome navigation={navigation} /> );
    expect(toJSON()).toMatchSnapshot();
  })
})