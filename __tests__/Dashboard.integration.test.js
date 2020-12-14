import React from 'react';
import Dashboard from '../Dashboard';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

describe('Dashboard navigation integration test', () => {

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

  test('should navigate to the right screen when icons are pressed', async () => {
    const { getByTestId, getByText } = dashboardInstance;
    fireEvent(getByTestId('Nav-Joogal'), 'onPress');
    await waitFor(() => { expect(getByText('Collaborations')).toBeTruthy(); });

    fireEvent(getByTestId('Nav-Discover'), 'onPress');
    await waitFor(() => { expect(getByTestId('Discover')).toBeTruthy(); });

    fireEvent(getByTestId('Nav-Profile'), 'onPress');
    await waitFor(() => { expect(getByTestId('uploadBtn')).toBeTruthy(); });
  });
});