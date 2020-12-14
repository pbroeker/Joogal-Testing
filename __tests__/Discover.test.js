import React from 'react';
import Discover from "../Discover";
import { fireEvent, render, waitFor, debug, screen } from '@testing-library/react-native';
// import '@testing-library/jest-dom/extend-expect';

// jest.mock('../../assets/match.png');
// const mockSetState = jest.fn();
const nextArtist = jest.fn();
const likeArtist = jest.fn();

/* jest.mock('react', () => ({
  useState: initial => [initial, mockSetState]
})); */

// const setState = jest.fn();
// const useStateSpy = jest.spyOn(React, 'useState');
// useStateSpy.mockImplementation((init) => [init, setState]);

// console.log(fakeArtist.media.length, 'here------------------');

describe('Discover Component ', () => {
  let discoverRenderedInstance;
  beforeEach(() => {

    const fakeMediaItem = {
      url: 'String',
      type: 'String',
      caption: 'This is a Caption'
    };

    const fakeUserId = '484958409';
    const fakeArtists = [fakeArtist, fakeNextArtist];
    const fakeArtist = {
      profilepic: "test",
      artistname: 'Gott 1',
      firstname: 'Go',
      lastname: 'last',
      email: 'email@email.de',
      roles: ['role one', 'role two'],
      about: 'Text',
      media: { list: [fakeMediaItem, fakeMediaItem], length: 2 }
    };
    
      const fakeNextArtist = {
        profilepic: "test2",
      artistname: 'Gott 2',
      firstname: 'Go',
      lastname: 'last',
      email: 'email@email.de',
      roles: ['role one', 'role two'],
      about: 'Text',
      media: { list: [fakeMediaItem, fakeMediaItem], length: 2 }
    };

      const fakeNextNextArtist = {
      artistname: 'Gott 3',
      firstname: 'Go',
      lastname: 'last',
      email: 'email@email.de',
      roles: ['role one', 'role two'],
      about: 'Text',
      media: { list: [fakeMediaItem, fakeMediaItem], length: 2 }
    };

    discoverRenderedInstance = render(<Discover userid={fakeUserId}
      artists={fakeArtists}
      nextArtist={nextArtist} likeArtist={likeArtist} />);
  });


  afterEach(() => {
    discoverRenderedInstance.unmount();
    jest.clearAllMocks();
  });

  test('should render the Discover Component', () => {
    expect(discoverRenderedInstance.getByTestId('Discover')).toBeTruthy();
  });

  test('should render the PressNext Button', () => {
    expect(discoverRenderedInstance.getByTestId('pressNext')).toBeTruthy();
  });

  test('should call the pressNext function after push the pressNext TouchableHighlight', () => {
    // expect to find fakeartist
    fireEvent.press(discoverRenderedInstance.getByTestId('pressNext'));
    expect(nextArtist).toHaveBeenCalledTimes(1);
    // expect not to find fakeartist and to find artist
  });
  /*  it.only('should pressNext should render a image with the ../assets/next.png source', () => {
     discoverRenderedInstance.getByTestId('press')debug()
     const v = discoverRenderedInstance.getByTestId('pressNextImage');
     expect(discoverRenderedInstance.getByTestId('pressNextImage'));
   }); */

  test('should have opacity zero and likeArtist func should be called', async () => {
    const pressLike = discoverRenderedInstance.getByTestId('pressLike');
    expect(pressLike.props.style[1]).toHaveProperty('opacity', 1);
    fireEvent(discoverRenderedInstance.getByTestId('pressLike'), 'onPress');
    await waitFor(() => {
      expect(pressLike.props.style).toHaveProperty('opacity', 0);
      expect(likeArtist).toHaveBeenCalledTimes(1);
    });
  });
});



