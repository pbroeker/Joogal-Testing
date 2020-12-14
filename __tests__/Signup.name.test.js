import React from 'react';
import Name from '../Signup/Signup.Name';
import { fireEvent, render } from '@testing-library/react-native';
import { Alert } from 'react-native';

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('Signup Name', () => {
  const setSignup = jest.fn();
  const navigation = {navigate : jest.fn()};
  let renderedComponent;

  beforeEach(() => {
    Alert.alert.mockReset();
    renderedComponent = render( <Name navigation={navigation} setSignup={setSignup} /> );
  })

  test('snapshot', () => {
    const { toJSON } = renderedComponent;
    expect(toJSON()).toMatchSnapshot();
  })

  test('rendered correctly', () => {
    const { getByText } = renderedComponent;
    expect(getByText('What\'s your name?')).toBeTruthy();
  })

  test('calls signup correctly', () => {
    const { getByText, getByPlaceholderText } = renderedComponent;
    fireEvent(getByPlaceholderText('First name*'), 'onChangeText', 'testuser');
    fireEvent(getByText('➤'), 'onPress');
    expect(setSignup).toHaveBeenCalledTimes(1);
  })

  test('calls alert if user doesn\' give any firstname', () => {
    const { getByText } = renderedComponent;
    fireEvent(getByText('➤'), 'onPress');
    expect(Alert.alert).toHaveBeenCalledWith('Please enter at least your first name');
  })

})