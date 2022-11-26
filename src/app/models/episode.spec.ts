import { Episode } from './episode.model';

describe('Episode', () => {
  const episode = new Episode(
    1,
    'Pilot',
    'December 2, 2013',
    'S01E01',
    [],
    'https://rickandmortyapi.com/api/episode/1',
    '2017-11-10T12:56:33.798Z'
  );

  it('should create an instance', () => {
    expect(episode).toBeTruthy();
  });
});
