import { Injectable } from '@angular/core';
import { IDbHeroSnapshotIn } from '../types/types';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Apollo, QueryRef } from 'apollo-angular';
import { GET_ALL_HEROES } from './graphql/queries/getAllHeroes.query';
import { GET_HEROES_BY_RATING } from './graphql/queries/getHeroesByRating.query';
import { environment } from 'src/environments/environment';
import {
  IGetHeroesResponse,
  IInsertNewHeroResponse,
  IUpdateHeroResponse,
  IDeleteHeroResponse,
  IUpdateExistingHeroResponse,
} from './graphql/interface';
import { HERO_RATING_MUTATION } from './graphql/mutations/heroRating.mutation';
import _ from 'lodash';
import { INSERT_HERO_MUTATION } from './graphql/mutations/insertHero.mutation';
import { DELETE_HERO_MUTATION } from './graphql/mutations/deleteHero.mutation';
import { GET_HERO_BY_ID } from './graphql/queries/getHeroById';
import { UPDATE_HERO_MUTATION } from './graphql/mutations/updateHero.mutation';
import { EmptyObject } from 'apollo-angular/build/types';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  public allHeroes: IDbHeroSnapshotIn[] = [];
  public heroesOrderedByRating: IDbHeroSnapshotIn[] = [];
  public fetchAllHeroesQuery: QueryRef<IGetHeroesResponse> | undefined;
  public fetchHeroesOrderedByRatingQuery:
    | QueryRef<IGetHeroesResponse>
    | undefined;
  public fetched_all_heroes = false;

  public editHero: IDbHeroSnapshotIn | undefined;

  constructor(private http: HttpClient, private apollo: Apollo) {}

  validateAllFetchedHeroesLength(aggregate_count: number): void {
    if (aggregate_count === this.heroesOrderedByRating.length) {
      this.fetched_all_heroes = true;
    } else {
      this.fetched_all_heroes = false;
    }
  }

  fetchAllHeroes(): void {
    this.fetchAllHeroesQuery = this.apollo.watchQuery<IGetHeroesResponse>({
      query: GET_ALL_HEROES,
    });

    this.fetchAllHeroesQuery?.valueChanges.subscribe(({ data, loading }) => {
      if (!loading) {
        this.allHeroes = data.heroes;
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

  getHeroById(
    id: string
  ): QueryRef<{ heroes: IDbHeroSnapshotIn[] }, EmptyObject> {
    return this.apollo.watchQuery<{ heroes: IDbHeroSnapshotIn[] }>({
      query: GET_HERO_BY_ID,
      variables: {
        id,
      },
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

  updateExistingHero({
    id,
    name,
    gender,
    species,
    photo,
  }: IDbHeroSnapshotIn): void {
    console.log('vars:::', id, name, gender, species, photo);
    this.apollo
      .mutate<IUpdateExistingHeroResponse>({
        mutation: UPDATE_HERO_MUTATION,
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

  deleteHero(id: string): void {
    this.apollo
      .mutate<IDeleteHeroResponse>({
        mutation: DELETE_HERO_MUTATION,
        variables: {
          id,
        },
      })
      .subscribe({
        next: (data) => {
          const deleted_id = data.data?.delete_heroes.returning[0].id;
          console.log('deleted_id', deleted_id);
          this.heroesOrderedByRating = this.heroesOrderedByRating.filter(
            (hero) => hero.id !== deleted_id
          );
        },
        error: (e) => console.error(e),
        complete: () => console.info('hero deleted'),
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
