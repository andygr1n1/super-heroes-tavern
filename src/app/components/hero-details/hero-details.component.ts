import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    @Inject(MAT_DIALOG_DATA) public data: { hero: IDbHeroSnapshotIn }
  ) {}

  get hero(): IDbHeroSnapshotIn {
    if (!this.data) {
      console.error('HeroDetailsComponent error');
      return { name: '' };
    }

    return this.data.hero;
  }

  toggleEditName(): void {
    this.edit_name = !this.edit_name;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
