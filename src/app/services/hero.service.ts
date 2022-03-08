import { Injectable } from '@angular/core';
import { IDbHeroSnapshotIn } from '../types/types';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';

const GET_HEROES = gql`
  {
    heroes {
      id
      name
      gender
      species
      photo
    }
  }
`;

export interface IHasurHeroesResponse {
  heroes: [
    {
      id: string;
      name: string;
      gender: string;
      species: string;
      photo: string;
    }
  ];
}

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  public heroes: IDbHeroSnapshotIn[] = [];

  public hasura_heroes: Observable<any> | undefined;

  constructor(private http: HttpClient, private apollo: Apollo) {}

  private heroesUrl = 'http://localhost:8088/v1/graphql';

  getHasuraHeroes(): void {
    const hasuraHeres = this.apollo
      .watchQuery<IHasurHeroesResponse>({
        query: GET_HEROES,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        if (!loading) {
          console.log('loading', loading);
          console.log('data', data.heroes?.[0]);
          this.heroes = data.heroes;
        }
      });

    console.log('hasuraHeres', hasuraHeres);
    console.log('hasuraHeres');
  }

  getHeroes(): void {
    const heroes_data = this.http
      .get<IDbHeroSnapshotIn[]>(this.heroesUrl)
      .pipe(catchError(this.handleError<IDbHeroSnapshotIn[]>('getHeroes', [])));

    heroes_data.subscribe((heroes_data) => {
      console.log('heroes_data', heroes_data);
      // this.heroes = heroes_data;
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

  addHero(hero: IDbHeroSnapshotIn): void /* Observable<IDbHeroSnapshotIn> */ {
    this.heroes.push(hero);
    // return this.http
    //   .post<IDbHeroSnapshotIn>(this.heroesUrl, hero, this.httpOptions)
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
    const url = `${this.heroesUrl}/${id}`;
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
      .get<IDbHeroSnapshotIn[]>(`${this.heroesUrl}/?name=${term}`)
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
