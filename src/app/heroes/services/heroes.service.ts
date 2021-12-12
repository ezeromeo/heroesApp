import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Hero } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private apiEndpoint: string = environment.apiEndpoint;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.apiEndpoint}/heroes`);
  }

  getHeroById(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.apiEndpoint}/heroes/${id}`);
  }

  getSuggestions(term: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(
      `${this.apiEndpoint}/heroes?q=${term}&_limit=6`
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.apiEndpoint}/heroes`, hero);
  }

  upgradeHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.apiEndpoint}/heroes/${hero.id}`, hero);
  }

  deleteHero(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiEndpoint}/heroes/${id}`);
  }
}
