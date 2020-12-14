import React from 'react';
import Joogal from '../Joogal';
import { fireEvent, render } from '@testing-library/react-native';

const user = {
  id: 3,
  artistname: 'Kollwitz',
  firstname: 'kaethe',
  lastname: 'kollwitz',
  email: 'kaethe@artists.de',
  roles: ['painter'],
  about: 'a German artist who worked with painting, printmaking and sculpture',
  likes: [{ target: 1 }],
  profilepic: null
};

const artist1 = {
  id: 1,
  likes: [{ target: 3 }],
  artistname: 'Kubrick',
  firstname: 'Stanley',
  lastname: 'Kubrick',
  email: 'kubrick@artists.com',
  roles: ['filmmaker'],
  about: 'American film director',
  profilepic: null
};

const artist2 = {
  likes: [{ target: 1 }],
  profilepic: null,
  id: 2,
  artistname: 'Eminem',
  firstname: 'Marshall',
  lastname: 'Mathers',
  email: 'eminem@artists.com',
  roles: ['rapper'],
  about: 'is an American rapper, songwriter, and record producer'
};

const allArtists = [artist1, artist2];
const refreshUser = jest.fn();

beforeEach(() => {
  joogalInstance = render(<Joogal user={user} allArtists={allArtists} refreshUser={refreshUser} />);
});

afterEach(() => {
  joogalInstance.unmount();
});

test('component mounts', () => {
  expect(joogalInstance.getByTestId('Joogal')).toBeTruthy();
});

test('renders correctly', () => {
  const text = joogalInstance.getByText('Collaborations');
  expect(text).toBeTruthy();
});

test('displays liked artists', () => {
  const liked = joogalInstance.getByText(`${artist1.firstname} ${artist1.lastname}`);
  expect(liked).toBeTruthy();
});

test('does not display artists that are not liked', () => {
  const notLiked = joogalInstance.queryByText(`${artist2.firstname} ${artist2.lastname}`);
  expect(notLiked).toBeNull();
});

test('snapshot', () => {
  expect(joogalInstance.toJSON()).toMatchSnapshot();
});

test('should refresh', () => {
  const flatList=joogalInstance.getByTestId('Joogal-FlatList');
  expect(refreshUser).toHaveBeenCalledTimes(0);
  fireEvent(flatList.props.refreshControl, 'refresh');
  expect(refreshUser).toHaveBeenCalledTimes(1);
});