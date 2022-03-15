import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/services/hero.service';
import { IDbHeroSnapshotIn } from 'src/app/types/types';
import { environment } from 'src/environments/environment';
import _ from 'lodash';
import { HeroBioService } from 'src/app/services/hero-info/hero-bio.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  SRV_NODE_SUPERHEROES = environment.SRV_NODE;
  logo_title = 'Dashboard';
  input_data = '';

  constructor(
    private heroService: HeroService,
    private heroBioService: HeroBioService
  ) {}

  get heroes(): IDbHeroSnapshotIn[] {
    return this.heroService.heroesOrderedByRating.filter((hero) =>
      _.lowerCase(hero.name.trim()).includes(
        _.lowerCase(this.input_data.trim())
      )
    );
  }

  get fetched_all_heroes(): boolean {
    return this.heroService.fetched_all_heroes;
  }

  fetchMoreHeroes(): void {
    this.heroService.fetchMoreHeroesOrderedByRating();
  }

  inputDataChange(value: string) {
    this.input_data = value;
  }

  geHeroDetails(hero: IDbHeroSnapshotIn): void {
    this.heroBioService.openHeroDetails(hero);
  }

  ngOnInit(): void {
    if (this.heroService.fetchHeroesOrderedByRatingQuery) {
      console.log('gg');
      this.heroService.fetchHeroesOrderedByRatingQuery.refetch();
    } else {
      this.heroService.fetchHeroesOrderedByRating();
    }
  }
}
