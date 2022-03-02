import { Component, OnInit } from '@angular/core';
import { nanoid } from 'nanoid';
import { IHero } from './heroes.interface';
import heroes_json from '../../../local-db/dbHeroes.json';
import { IDbHeroSnapshotIn } from 'src/app/types/types';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  public heroes: IDbHeroSnapshotIn[] | undefined = heroes_json;

  hero: IHero = {
    id: nanoid(),
    name: 'Crystal Maiden',
  };

  constructor() {}

  ngOnInit(): void {}
}
