import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeroService } from 'src/app/services/hero.service';
import { IDbHeroSnapshotIn } from 'src/app/types/types';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss'],
})
export class HeroDetailsComponent implements OnInit {
  edit_name = false;
  // heroname = this.data.hero.name ?? '';

  constructor(
    public dialogRef: MatDialogRef<HeroDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { hero: IDbHeroSnapshotIn },
    public heroService: HeroService
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
