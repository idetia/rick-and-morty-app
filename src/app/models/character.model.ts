import { Episode } from './episode.model';

export const CHARACTER_STATUS_ALIVE = 'Alive';
export const CHARACTER_STATUS_DEAD = 'Dead';
export const CHARACTER_STATUS_UNKNOWN = 'unknown';

export const CHARACTER_GENDER_MALE = 'Male';
export const CHARACTER_GENDER_FEMALE = 'Female';
export const CHARACTER_GENDER_GENDERLESS = 'Genderless';
export const CHARACTER_GENDER_UNKNOWN = 'unknown';

export class Character {
  constructor(
    public id: number,
    public name: string,
    public status: string,
    public species: string,
    public type: string,
    public gender: string,
    public origin: { name: string; url: string },
    public location: { name: string; url: string },
    public image: string,
    public episode: Array<string>,
    public url: string,
    public created: string,
    public lastEpisode?: Episode
  ) {}
}
