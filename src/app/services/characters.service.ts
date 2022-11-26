import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Character } from '../models/character.model';
import { EpisodeService } from './episode.service';
import { Episode } from '../models/episode.model';

const API_ENDPOINT = 'https://rickandmortyapi.com/api/character/';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor(
    private httpClient: HttpClient,
    private episodeService: EpisodeService
  ) {}

  getCharacters(filters?: any): Observable<Character[]> {
    // Filter params
    let params = new HttpParams();

    if (filters['search'] && filters['search'] != '') {
      params = params.append('name', filters['search']);
    }

    if (filters['status'] && filters['status'] != '') {
      params = params.append('status', filters['status'].toLowerCase());
    }

    if (filters['gender'] && filters['gender'] != '') {
      params = params.append('gender', filters['gender'].toLowerCase());
    }

    // Get characters from remote API
    return this.httpClient.get(API_ENDPOINT, { params }).pipe(
      map((response: any) => {
        // Get only five characters
        let characters = (response['results'] as Character[]).slice(0, 5);

        characters = characters.map((character: Character) => {
          this.episodeService
            .getEpisodeByURL(character.episode.slice(-1)[0] ?? '')
            ?.subscribe((response) => {
              character.lastEpisode = response as Episode;
            });
          return character;
        });

        return characters;
      })
    );
  }
}
