import React from 'react';
import Authenticate from '../Authenticate';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ApiService from '../../Utils/ApiService';
import { Alert } from 'react-native';

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

jest.mock('../../Utils/ApiService');

describe('Authenticate', () => {
  const navigation = {navigate : jest.fn()};
  const updated = false;
  const user = {};
  const loginUser = {};
  let renderedAuthenticate;
  
  beforeEach(() => {
    Alert.alert.mockReset()
    renderedAuthenticate = render(
      <Authenticate updated={updated} user={user} navigation={navigation} loginUser={loginUser} />
    )
  });

  test('renders correctly', () => {
    const { getByText } = renderedAuthenticate;
      const text = getByText('CREATE ACCOUNT');
      expect(text).toBeTruthy();
  }) 
  
  test('calls on submit with email and password', () => {
    const { getByTestId, getByDisplayValue} = renderedAuthenticate;
    const email = getByTestId('emailInput');
    const password = getByTestId('passwordInput');
    const sendBtn = getByTestId('sendBtn');

    fireEvent(email, 'onChangeText', 'norris@gmail.com');
    fireEvent(password,'onChangeText', 'somepassword');
    expect(getByDisplayValue('norris@gmail.com')).toBeTruthy();
    expect(getByDisplayValue('somepassword')).toBeTruthy();
    fireEvent(sendBtn, 'onPress');
    expect(ApiService.getArtistByEmail).toHaveBeenCalledTimes(1);
    expect(ApiService.getArtistByEmail).toHaveBeenCalledWith('norris@gmail.com')
  })

  test('alerts on non-valid email/password', async () => {
    ApiService.getArtistByEmail.mockResolvedValue(false);
    const { getByTestId } = renderedAuthenticate;
    const sendBtn = getByTestId('sendBtn');
    const email = getByTestId('emailInput');
    const password = getByTestId('passwordInput');

    fireEvent(sendBtn, 'onPress');
    expect(Alert.alert).toHaveBeenCalled();
    fireEvent(email, 'onChangeText', 'wrongMail');
    fireEvent(password,'onChangeText', 'somepassword');
    fireEvent(sendBtn, 'onPress');

    await waitFor(() => {
      expect(ApiService.getArtistByEmail).toHaveBeenCalledWith('wrongMail');
      expect(Alert.alert).toHaveBeenCalledTimes(2);
    })
  })

  test('renders Modal when Create Account is clicked', async () => {
    const { getByTestId } = renderedAuthenticate;
    const modal = getByTestId('loginModal');
    const backButton = getByTestId('modalBackBtn');
    const loginButton = getByTestId('loginBtn');
    expect(modal.props).toHaveProperty('visible', false);
    fireEvent(loginButton, 'onPress');

    await waitFor(() => {
      expect(modal.props).toHaveProperty('visible', true);
    })
    fireEvent(backButton, 'onPress');
    await waitFor(() => {
      expect(modal.props).toHaveProperty('visible', false);
    })
  }) 
})
