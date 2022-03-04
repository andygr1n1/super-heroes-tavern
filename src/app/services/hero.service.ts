import { Injectable } from '@angular/core';
import { IDbHeroSnapshotIn } from '../types/types';
import heroes_json from '../../local-db/dbHeroes.json';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor() {}

  getHeroes(): Observable<IDbHeroSnapshotIn[]> {
     const heroes = of(heroes_json);
    return heroes;
  }
}
