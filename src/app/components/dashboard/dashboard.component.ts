import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/services/hero.service';
import { IDbHeroSnapshotIn } from 'src/app/types/types';
import { environment } from 'src/environments/environment';
import _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  logo_title = 'Dashboard';
  input_data = '';

  inputDataChange(value: string) {
    this.input_data = value;
  }

  SRV_NODE = environment.SRV_NODE;

  constructor(private heroService: HeroService) {}

  get heroes(): IDbHeroSnapshotIn[] {
    return this.heroService.heroesOrderedByRating.filter((hero) =>
      _.lowerCase(hero.name.trim()).includes(
        _.lowerCase(this.input_data.trim())
      )
    );
  }

  ngOnInit(): void {
    if (this.heroService.fetchHeroesOrderedByRatingQuery) {
      this.heroService.fetchHeroesOrderedByRatingQuery.refetch();
    } else {
      this.heroService.fetchHeroesOrderedByRating();
    }
  }
}
