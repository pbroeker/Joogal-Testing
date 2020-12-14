import React from 'react';
import Dashboard from '../Dashboard';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('../Discover',()=> ()=> <div testID='Mock-Discover'></div>);
jest.mock('../Joogal',()=> ()=> <div testID='Mock-Joogal'></div>);
jest.mock('../Profile',()=> ()=> <div testID='Mock-Profile'></div>);

describe('Dashboard navigation test', () => {

  const refreshUser = jest.fn();
  const likeArtist = jest.fn();
  const newUpload = jest.fn();
  const userid = 3;
  const artist1={}
  const artist2={}
  const allArtists = [artist1, artist2];

  beforeEach(() => {
    dashboardInstance = render(
      <NavigationContainer >
        <Dashboard
          user={artist1}
          userid={userid}
          artists={allArtists}
          nextArtist={artist2}
          likeArtist={likeArtist}
          allArtists={allArtists}
          newUpload={newUpload}
          refreshUser={refreshUser}
        />
      </NavigationContainer>
    );
  });


  afterEach(() => {
    dashboardInstance.unmount();
  });

  test('Navigation component mounts', () => {
    const { getByTestId } = dashboardInstance;
    expect(getByTestId('Nav-Discover')).toBeTruthy();
    expect(getByTestId('Nav-Profile')).toBeTruthy();
    expect(getByTestId('Nav-Joogal')).toBeTruthy();
  });

  test('should navigate to the right screen when icons are pressed', async () => {
    const { getByTestId } = dashboardInstance;
    fireEvent(getByTestId('Nav-Joogal'), 'onPress');
    await waitFor(() => { expect(getByTestId('Mock-Joogal')).toBeTruthy(); });

    fireEvent(getByTestId('Nav-Discover'), 'onPress');
    await waitFor(() => { expect(getByTestId('Mock-Discover')).toBeTruthy(); });

    fireEvent(getByTestId('Nav-Profile'), 'onPress');
    await waitFor(() => { expect(getByTestId('Mock-Profile')).toBeTruthy(); });
  });
});