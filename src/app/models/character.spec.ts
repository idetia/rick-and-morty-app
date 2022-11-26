import { Character } from './character.model';

describe('Character', () => {
  it('should create an instance', () => {
    const character = new Character(
      1,
      'Rick Sanchez',
      'Alive',
      'Human',
      '',
      'Male',
      {
        name: 'Earth',
        url: 'https://rickandmortyapi.com/api/location/1',
      },
      {
        name: 'Earth',
        url: 'https://rickandmortyapi.com/api/location/20',
      },
      'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      [
        'https://rickandmortyapi.com/api/episode/1',
        'https://rickandmortyapi.com/api/episode/2',
      ],
      'https://rickandmortyapi.com/api/character/1',
      '2017-11-04T18:48:46.250Z'
    );
    expect(character).toBeTruthy();
  });
});
