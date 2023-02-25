import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JokeModel } from '../models/joke.model';

@Injectable()
export class JokeService {
  url = 'https://jokeapi-v2.p.rapidapi.com/joke/Any';
  params = {
    format: 'json',
    blacklistFlags: 'nsfw,racist',
    type: 'single',
  } as const;
  constructor(private httpClient: HttpClient) {}

  getJoke$(): Observable<JokeModel> {
    return this.httpClient.get<JokeModel>(this.url, {
      params: this.params,
    });
  }
}
