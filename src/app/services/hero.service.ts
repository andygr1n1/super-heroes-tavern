import { Injectable } from '@angular/core';
import { IDbHeroSnapshotIn } from '../types/types';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { GET_HEROES } from './graphql/queries/getHeroes.query';
import { GET_HEROES_BY_RATING } from './graphql/queries/getHeroesByRating.query';
import { environment } from 'src/environments/environment';
import { IGetHeroesResponse } from './graphql/interface';





@Injectable({
  providedIn: 'root',
})
export class HeroService {
  public heroes: IDbHeroSnapshotIn[] = [];
  public heroesOrderedByRating: IDbHeroSnapshotIn[] = [];

  public hasura_heroes: Observable<any> | undefined;

  constructor(private http: HttpClient, private apollo: Apollo) {}

  fetchHeroes(): void {
    this.apollo
      .watchQuery<IGetHeroesResponse>({
        query: GET_HEROES,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        if (!loading) {
          this.heroes = data.heroes;
        }
      });
  }

  fetchHeroesOrderedByRating(): void {
    this.apollo
      .watchQuery<IGetHeroesResponse>({
        query: GET_HEROES_BY_RATING,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        if (!loading) {
          this.heroesOrderedByRating = data.heroes;
        }
      });
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  updateHero(hero: IDbHeroSnapshotIn): Observable<any> {
    const response = this.http
      .put(environment.SRV_HASURA, hero, this.httpOptions)
      .pipe(
        tap((_) => console.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero', ''))
      );

    return response;
  }

  addHero(hero: IDbHeroSnapshotIn): void /* Observable<IDbHeroSnapshotIn> */ {
    this.heroes.push(hero);
    // return this.http
    //   .post<IDbHeroSnapshotIn>(environment.SRV_HASURA, hero, this.httpOptions)
    //   .pipe(
    //     tap((newHero: IDbHeroSnapshotIn) =>
    //       console.log(`added hero w/ id=${newHero.id}`)
    //     ),
    //     catchError(
    //       this.handleError<IDbHeroSnapshotIn>('addHero', { id: '', name: '' })
    //     )
    //   );
  }

  deleteHero(id: string): Observable<IDbHeroSnapshotIn> {
    console.log('id', id);
    const url = `${environment.SRV_HASURA}/${id}`;
    // this.heroes = this.heroes.filter((h) => h.id !== id);
    return this.http.delete<IDbHeroSnapshotIn>(url, this.httpOptions).pipe(
      tap((hero: IDbHeroSnapshotIn) => console.log('deleted hero:', hero)),
      catchError(
        this.handleError<IDbHeroSnapshotIn>('deleteHero', { id: '', name: '' })
      )
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<IDbHeroSnapshotIn[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http
      .get<IDbHeroSnapshotIn[]>(`${environment.SRV_HASURA}/?name=${term}`)
      .pipe(
        tap((x) =>
          x.length
            ? console.log(`found heroes matching "${term}"`)
            : console.log(`no heroes matching "${term}"`)
        ),
        catchError(this.handleError<IDbHeroSnapshotIn[]>('searchHeroes', []))
      );
  }

  private handleError<T>(operation = 'operation', result: T) {
    return (error: unknown): Observable<T> => {
      console.error('error:', error);

      return of(result);
    };
  }
}
