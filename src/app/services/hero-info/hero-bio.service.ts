import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeroDetailsComponent } from 'src/app/components/hero-details/hero-details.component';
import { IDbHeroSnapshotIn } from 'src/app/types/types';

@Injectable({
  providedIn: 'root',
})
export class HeroBioService {
  constructor(private dialog: MatDialog) {}

  openHeroDetails(hero: IDbHeroSnapshotIn): void {
    const dialogRef = this.dialog.open(HeroDetailsComponent, {
      width: '100%',
      height: '90%',
      data: { hero },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
}
