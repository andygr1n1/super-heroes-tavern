import { Injectable } from '@angular/core';
import { IDbHeroSnapshotIn } from '../types/types';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { Apollo, QueryRef } from 'apollo-angular';
import { GET_HEROES } from './graphql/queries/getHeroes.query';
import { GET_HEROES_BY_RATING } from './graphql/queries/getHeroesByRating.query';
import { environment } from 'src/environments/environment';
import {
  IGetHeroesResponse,
  IInsertNewHeroResponse,
  IUpdateHeroResponse,
} from './graphql/interface';
import { HERO_RATING_MUTATION } from './graphql/mutations/heroRating.mutation';
import _ from 'lodash';
import { INSERT_HERO_MUTATION } from './graphql/mutations/insertHero.mutation';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  public heroes: IDbHeroSnapshotIn[] = [];
  public heroesOrderedByRating: IDbHeroSnapshotIn[] = [];
  public fetchHeroesOrderedByRatingQuery:
    | QueryRef<IGetHeroesResponse>
    | undefined;
  public fetched_all_heroes = false;

  // public hasura_heroes: Observable<any> | undefined;

  constructor(private http: HttpClient, private apollo: Apollo) {}

  validateAllFetchedHeroesLength(aggregate_count: number): void {
    if (aggregate_count === this.heroesOrderedByRating.length) {
      this.fetched_all_heroes = true;
    } else {
      this.fetched_all_heroes = false;
    }
  }

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

  fetchHeroesOrderedByRating(offset = 0): void {
    this.fetchHeroesOrderedByRatingQuery =
      this.apollo.watchQuery<IGetHeroesResponse>({
        query: GET_HEROES_BY_RATING,
        variables: {
          offset,
        },
      });

    this.fetchHeroesOrderedByRatingQuery?.valueChanges.subscribe(
      ({ data, loading }) => {
        if (!loading) {
          this.heroesOrderedByRating = data.heroes.map((hero, index) => {
            return { ...hero, rating_place: index + 1 };
          });
          this.validateAllFetchedHeroesLength(
            data.heroes_aggregate.aggregate.count
          );
        }
      }
    );
  }

  fetchMoreHeroesOrderedByRating(): void {
    const fetchMore = this.apollo.watchQuery<IGetHeroesResponse>({
      query: GET_HEROES_BY_RATING,
      variables: {
        offset: this.heroesOrderedByRating.length,
      },
    });

    fetchMore.valueChanges.subscribe(({ data, loading }) => {
      if (!loading) {
        const newHeroes = data.heroes.map((hero, index) => {
          return {
            ...hero,
            rating_place: index + this.heroesOrderedByRating.length + 1,
          };
        });
        this.heroesOrderedByRating = [
          ...this.heroesOrderedByRating,
          ...newHeroes,
        ];
        this.validateAllFetchedHeroesLength(
          data.heroes_aggregate.aggregate.count
        );
      }
    });
  }

  updateHeroRating(id: string, rate: number): void {
    this.apollo
      .mutate<IUpdateHeroResponse>({
        mutation: HERO_RATING_MUTATION,
        variables: {
          id,
          rate,
        },
      })
      .subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
  }

  insertNewHero({ id, name, gender, species, photo }: IDbHeroSnapshotIn): void {
    console.log('vars:::', id, name, gender, species, photo);
    this.apollo
      .mutate<IInsertNewHeroResponse>({
        mutation: INSERT_HERO_MUTATION,
        variables: {
          id,
          name,
          gender,
          species,
          photo,
        },
      })
      .subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
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
