import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Episode } from '../models/episode.model';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  constructor(private httpClient: HttpClient) {}

  getEpisodeByURL(url: string): Observable<Episode> | null {
    if (url == '') {
      return null;
    }

    // Get episode from remote API
    return this.httpClient.get(url).pipe(
      map((response: any) => {
        return response as Episode;
      })
    );
  }
}
