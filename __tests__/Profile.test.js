import React from "react";
import Profile from "../Profile";
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Firebase from '../../Utils/Firebase';
import ApiService from '../../Utils/ApiService';

jest.mock('../../Utils/Firebase');
jest.mock('../../Utils/ApiService');

describe('Profile', () => {
  let user = {};
  const newUpload = jest.fn();
  const refreshUser = {};
  const metaData = {url: 'testurl', type: 'video'}
  let renderedProfile;
  
  beforeEach(() => {
    renderedProfile = render(<Profile user={user} newUpload={newUpload} refreshUser={refreshUser}/>)
  });
  
  afterEach(() => {
    jest.resetAllMocks()  
  })

  test('renders modal correctly on click', async () => {
    Firebase.onChooseImagePress.mockResolvedValue(metaData);
    const { getByTestId } = renderedProfile;
    const modal = getByTestId('uploadModal');
    const backBtn = getByTestId('backBtn');
    const uploadBtn = getByTestId('uploadBtn');

    expect(modal.props).toHaveProperty('visible', false);
    fireEvent(uploadBtn, 'onPress');
    await waitFor(() => {
      expect(modal.props).toHaveProperty('visible', true);
      expect(Firebase.onChooseImagePress).toHaveBeenCalledTimes(1);
    });

    fireEvent(backBtn, 'onPress');
    await waitFor (() => 
      expect(modal.props).toHaveProperty('visible', false)
    );
    
    fireEvent(backBtn, 'onPress');
    await waitFor (() => {
      expect(modal.props).toHaveProperty('visible', true);
    })
  })

  test('renders correctly without profile picture', async () => {
    const { getByText } = renderedProfile;
    await waitFor (() => {expect(getByText('Upload profile picture')).toBeTruthy()});
  })

  test('renders correctly with picture', async () => {
    const { queryByText } = render (<Profile user={ {profilepic : { url: 'testurl'}}} newUpload={newUpload} refreshUser={refreshUser}/>)
    await waitFor (() => {expect(queryByText('Upload profile picture')).toBeNull()});
  })
  

  test('sends and handles image information from services', async () => {
    const { getByText } = renderedProfile;
    Firebase.onChooseImagePress.mockResolvedValue(metaData);
    ApiService.editProfilepic.mockResolvedValue(true);
    ApiService.addProfilepic.mockResolvedValue({artistId: 10, url: metaData.url});
    fireEvent(getByText('Upload profile picture'), 'onPress');
    
    await waitFor(() => {
      expect(Firebase.onChooseImagePress).toHaveBeenCalledTimes(1);
      expect(newUpload).toHaveBeenCalledWith('testurl');
    })
  })
})