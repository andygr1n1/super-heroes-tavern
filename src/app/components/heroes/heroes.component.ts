import { Component, OnInit } from '@angular/core';
import { nanoid } from 'nanoid';
import { IHero } from './heroes.interface';
import { IDbHeroSnapshotIn } from 'src/app/types/types';
import { MatDialog } from '@angular/material/dialog';
import { HeroDetailsComponent } from '../hero-details/hero-details.component';
import { HeroService } from 'src/app/services/hero.service';
import { environment } from 'src/environments/environment';
import _ from 'lodash';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  logo_title = 'Super heroes';
  input_data = '';
  SRV_NODE = environment.SRV_NODE;

  constructor(public dialog: MatDialog, public heroService: HeroService) {}

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
    return this.heroService.allHeroes.filter((hero) =>
      _.lowerCase(hero.name.trim()).includes(
        _.lowerCase(this.input_data.trim())
      )
    );
  }

  inputDataChange(value: string) {
    this.input_data = value;
  }

  ngOnInit(): void {
    if (!this.heroService.fetchAllHeroesQuery) {
      this.heroService.fetchAllHeroes();
    } else {
      this.heroService.fetchAllHeroesQuery.refetch();
    }
  }
}
