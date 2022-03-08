import { Component, OnInit } from '@angular/core';
import { nanoid } from 'nanoid';
import { IHero } from './heroes.interface';
import { IDbHeroSnapshotIn } from 'src/app/types/types';
import { MatDialog } from '@angular/material/dialog';
import { HeroDetailsComponent } from '../hero-details/hero-details.component';
import { HeroService } from 'src/app/services/hero.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  logo_title = 'Super heroes';
  SRV_NODE = environment.SRV_NODE

  constructor(public dialog: MatDialog, private heroService: HeroService) {}

  openDialog(hero: IDbHeroSnapshotIn): void {}

  openHeroDetails(hero: IDbHeroSnapshotIn): void {
    console.log('selectedHero', hero);

    const dialogRef = this.dialog.open(HeroDetailsComponent, {
      width: '100%',
      height: '90%',
      data: { hero },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  get heroes(): IDbHeroSnapshotIn[] {
    return this.heroService.heroes;
  }

  ngOnInit(): void {
    this.heroService.fetchHeroes();
    // console.log('this.heroService.heroes', this.heroService.heroes);
  }
}
