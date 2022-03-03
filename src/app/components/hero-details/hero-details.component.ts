import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDbHeroSnapshotIn } from 'src/app/types/types';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss'],
})
export class HeroDetailsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<HeroDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { hero: IDbHeroSnapshotIn }
  ) {}

  get hero(): IDbHeroSnapshotIn | undefined {
    if (!this.data) {
      console.error('HeroDetailsComponent error');
      return;
    }

    return this.data.hero;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
