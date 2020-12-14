import React from 'react';
import Email from '../Signup/Signup.Email';
import { fireEvent, render } from '@testing-library/react-native';
import { Alert } from 'react-native';

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('Signup Email', () => {
  const setSignup = jest.fn();
  const navigation = {navigate : jest.fn()};
  let renderedComponent;

  beforeEach(() => {
    Alert.alert.mockReset();
    renderedComponent = render( <Email navigation={navigation} setSignup={setSignup} /> );
  })

  test('snapshot', () => {
    const { toJSON } = renderedComponent;
    expect(toJSON()).toMatchSnapshot();
  })

  test('renders correctly', () => {
    const { getByText } = renderedComponent;
    expect(getByText('What\'s your email address?')).toBeTruthy();
  })

  test('calls signup correctly', () => {
    const { getByText, getByPlaceholderText } = renderedComponent;
    fireEvent(getByPlaceholderText('your@email.com*'), 'onChangeText', 'workingMailAddress@gmail.com');
    fireEvent(getByText('➤'), 'onPress' );
    expect(setSignup).toHaveBeenCalledTimes(1);
  })

  test('gives an alert on too short mailadress', () => {
    const { getByPlaceholderText, getByText } = renderedComponent;
    fireEvent(getByPlaceholderText('your@email.com*'), 'onChangeText', 'a@b');
    fireEvent(getByText('➤'), 'onPress' );

    expect(Alert.alert).toHaveBeenCalledWith('Not a valid email address');
    expect(Alert.alert).toHaveBeenCalledTimes(1);
  })

  test('gives an alert on mailadress without @', () => {
    const { getByPlaceholderText, getByText } = renderedComponent;
    fireEvent(getByPlaceholderText('your@email.com*'), 'onChangeText', 'mailAddressWithout');
    fireEvent(getByText('➤'), 'onPress' );

    expect(Alert.alert).toHaveBeenCalledWith('Not a valid email address');
    expect(Alert.alert).toHaveBeenCalledTimes(1);
  })
})