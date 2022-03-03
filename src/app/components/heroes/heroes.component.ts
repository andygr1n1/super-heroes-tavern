import { Component, OnInit } from '@angular/core';
import { nanoid } from 'nanoid';
import { IHero } from './heroes.interface';
import heroes_json from '../../../local-db/dbHeroes.json';
import { IDbHeroSnapshotIn } from 'src/app/types/types';
import { MatDialog } from '@angular/material/dialog';
import { HeroDetailsComponent } from '../hero-details/hero-details.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  public heroes: IDbHeroSnapshotIn[] | undefined = heroes_json;
  title = 'Super heroes';
  hero: IHero = {
    id: nanoid(),
    name: 'Crystal Maiden',
  };

  constructor(public dialog: MatDialog) {}

  openDialog(hero: IDbHeroSnapshotIn): void {
   
  }

  openHeroDetails(hero: IDbHeroSnapshotIn): void {
    console.log('selectedHero', hero);
    
    
     const dialogRef = this.dialog.open(HeroDetailsComponent, {
       width: '100%',
       height: '90%',
       data: { hero },
     });

     dialogRef.afterClosed().subscribe((result) => {
       console.log('The dialog was closed');
       // this.animal = result;
     });
  }

  ngOnInit(): void {}
}
