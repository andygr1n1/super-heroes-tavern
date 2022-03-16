import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeroService } from 'src/app/services/hero.service';
import { IDbHeroSnapshotIn } from 'src/app/types/types';
import { environment } from 'src/environments/environment';
import { HeroesComponent } from '../heroes/heroes.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteHeroDialogComponent } from 'src/app/mini-components/confirm-delete-hero-dialog/confirm-delete-hero-dialog.component';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss'],
})
export class HeroDetailsComponent implements OnInit {
  edit_name = false;
  SRV_NODE = environment.SRV_NODE;
  // heroname = this.data.hero.name ?? '';

  constructor(
    public dialogRef: MatDialogRef<HeroDetailsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { hero: IDbHeroSnapshotIn },
    public heroService: HeroService,
    public confirmDeletedialog: MatDialog
  ) {}

  get hero(): IDbHeroSnapshotIn {
    if (!this.data) {
      console.error('HeroDetailsComponent error');
      return { id: '', name: '' };
    }

    return this.data.hero;
  }

  toggleEditName(): void {
    this.edit_name = !this.edit_name;
  }

  saveName(): void {
    this.edit_name = !this.edit_name;
    this.heroService.updateHero(this.data.hero).subscribe();
  }


  onClose(): void {
    this.dialogRef.close();
  }

  confirmDeleteDialog(): void {
    const dialogRef = this.confirmDeletedialog.open(
      ConfirmDeleteHeroDialogComponent,
      {
        data: { hero: this.hero, onCloseHeroDetails: this.dialogRef },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {}
}
