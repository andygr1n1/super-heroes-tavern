import { Injectable } from '@angular/core';
import { IDbHeroSnapshotIn } from '../types/types';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private http: HttpClient) {}

  private heroesUrl = 'api/heroes_collection';

  // getHeroes(): Observable<IDbHeroSnapshotIn[]> {
  //   const heroes = of(heroes_json);
  //   return heroes;
  // }
  getHeroes(): Observable<IDbHeroSnapshotIn[]> {
    return this.http
      .get<IDbHeroSnapshotIn[]>(this.heroesUrl)
      .pipe(catchError(this.handleError<IDbHeroSnapshotIn[]>('getHeroes', [])));
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  updateHero(hero: IDbHeroSnapshotIn): Observable<any> {
    const response = this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => console.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero', ''))
    );

    return response;
  }

  addHero(hero: IDbHeroSnapshotIn): Observable<IDbHeroSnapshotIn> {
    return this.http
      .post<IDbHeroSnapshotIn>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: IDbHeroSnapshotIn) =>
          console.log(`added hero w/ id=${newHero.id}`)
        ),
        catchError(this.handleError<IDbHeroSnapshotIn>('addHero', { id: '', name: ''}))
      );
  }

  private handleError<T>(operation = 'operation', result: T) {
    return (error: unknown): Observable<T> => {
      console.error('error:', error);

      return of(result);
    };
  }
}
