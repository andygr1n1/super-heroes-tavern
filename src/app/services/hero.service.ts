import { Injectable } from '@angular/core';
import { IDbHeroSnapshotIn } from '../types/types';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  public heroes: IDbHeroSnapshotIn[] = [];

  constructor(private http: HttpClient) {}

  private heroesUrl = 'api/heroes_collection';

  // getHeroes(): Observable<IDbHeroSnapshotIn[]> {
  //   const heroes = of(heroes_json);
  //   return heroes;
  // }

  getHeroes(): void {
    const heroes_data = this.http
      .get<IDbHeroSnapshotIn[]>(this.heroesUrl)
      .pipe(catchError(this.handleError<IDbHeroSnapshotIn[]>('getHeroes', [])));

    heroes_data.subscribe((heroes_data) => {
      this.heroes = heroes_data;
    });
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
        catchError(
          this.handleError<IDbHeroSnapshotIn>('addHero', { id: '', name: '' })
        )
      );
  }

  deleteHero(id: string): Observable<IDbHeroSnapshotIn> {
    console.log('id', id);
    const url = `${this.heroesUrl}/${id}`;
    this.heroes = this.heroes.filter((h) => h.id !== id);
    return this.http.delete<IDbHeroSnapshotIn>(url, this.httpOptions).pipe(
      tap((hero: IDbHeroSnapshotIn) => console.log('deleted hero:', hero)),
      catchError(
        this.handleError<IDbHeroSnapshotIn>('deleteHero', { id: '', name: '' })
      )
    );
  }

  private handleError<T>(operation = 'operation', result: T) {
    return (error: unknown): Observable<T> => {
      console.error('error:', error);

      return of(result);
    };
  }
}
