import { Component, OnInit } from '@angular/core';
import { nanoid } from 'nanoid';
import { IHero } from './heroes.interface';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  hero: IHero = {
    id: nanoid(),
    name: 'Crystal Maiden',
  };

  constructor() {}

  ngOnInit(): void {}
}
