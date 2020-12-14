import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import Signup from '../Signup/Signup';
import { NavigationContainer } from '@react-navigation/native';
import ApiService from '../../Utils/ApiService';

jest.mock('../../Utils/ApiService');
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('Signup integration test', () => {
  let loginUser = jest.fn();
  let updated = false;
  let renderedComponent;

  beforeEach(() => {
    renderedComponent = render (
      <NavigationContainer>
        <Signup
          loginUser={loginUser}
          updated={updated}
        />
      </NavigationContainer>
    );
  })

  test('Should navigate from welcome to name', async () => {
    const { getByText } = renderedComponent
    await waitFor(() => {expect(getByText('Continue')).toBeTruthy()});

    fireEvent(getByText(/Continue/i), 'onPress');
    await waitFor (() => {expect(getByText('What\'s your name?')).toBeTruthy()});
  })

  test('Should send the correct data to the api', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = renderedComponent;
    fireEvent(getByTestId('welcomeContinueButton'), 'onPress');
    await waitFor(() => {expect(getByText('What\'s your name?')).toBeTruthy()});

    fireEvent(getByPlaceholderText('First name*'), 'onChangeText', 'firstNameTest');
    fireEvent(getByPlaceholderText('Last name'), 'onChangeText', 'lastNameTest');
    fireEvent(getByTestId('nameContinueButton'), 'onPress');
    await waitFor(() => {expect(getByText('Do you have an artist name?')).toBeTruthy()});

    fireEvent(getByPlaceholderText('Artist name'), 'onChangeText', 'artistnameTest');
    fireEvent(getByTestId('artistContinueButton'), 'onPress');
    await waitFor(() => {expect(getByText('What\'s your email address?')).toBeTruthy()})

    fireEvent(getByPlaceholderText('your@email.com*'), 'onChangeText', 'testmail@gmail.com');
    fireEvent(getByTestId('emailContinueButton'), 'onPress');
    await waitFor(() => {expect(getByText('Musician')).toBeTruthy()}); 

    fireEvent(getByText('Musician'), 'onPress');
    fireEvent(getByText('Painter'), 'onPress');
    fireEvent(getByTestId('rolesContinueButton'), 'onPress');
    await waitFor(() => {expect(getByText('Tell us about your work..')).toBeTruthy()}); 

    fireEvent(getByPlaceholderText('...I am a music producer focusing on creating soundtracks for film...'), 'onChangeText', 'testParagraph');
    fireEvent(getByTestId('aboutContinueButton'), 'onPress');
    await waitFor(() => {expect(getByText('Almost there..')).toBeTruthy()}); 

    fireEvent(getByTestId('finalContinueButton'), 'onPress');
    await waitFor(() => {
      expect(ApiService.create).toHaveBeenCalledWith({
        artistname: 'artistnameTest',
        firstname: 'firstNameTest',
        lastname: 'lastNameTest',
        email: 'testmail@gmail.com',
        roles: ['Musician','Painter'],
        about: 'testParagraph'
      });
    })
    })
})

