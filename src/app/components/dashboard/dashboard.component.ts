import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/services/hero.service';
import { IDbHeroSnapshotIn } from 'src/app/types/types';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  logo_title = 'Dashboard';

  SRV_NODE = environment.SRV_NODE;

  constructor(private heroService: HeroService) {}

  get heroes(): IDbHeroSnapshotIn[] {
    return this.heroService.heroesOrderedByRating;
  }

  ngOnInit(): void {
    this.heroService.fetchHeroesOrderedByRating();
  }
}
