import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeroDetailsComponent } from 'src/app/components/hero-details/hero-details.component';
import { HeroService } from 'src/app/services/hero.service';
import { IDbHeroSnapshotIn } from 'src/app/types/types';

@Component({
  selector: 'app-confirm-delete-hero-dialog',
  templateUrl: './confirm-delete-hero-dialog.component.html',
  styleUrls: ['./confirm-delete-hero-dialog.component.scss'],
})
export class ConfirmDeleteHeroDialogComponent implements OnInit {
  input_data = '';
  constructor(
    public heroService: HeroService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      hero: IDbHeroSnapshotIn;
      onCloseHeroDetails: MatDialogRef<HeroDetailsComponent>;
    }
  ) {}

  get hero(): IDbHeroSnapshotIn {
    if (!this.data) {
      console.error('HeroDetailsComponent error');
      return { id: '', name: '' };
    }

    return this.data.hero;
  }

  get isDisabled(): boolean {
    return this.input_data === this.hero.name;
  }

  deleteHero(): void {
    this.heroService.deleteHero(this.hero.id);
    this.data.onCloseHeroDetails.close();
  }

  ngOnInit(): void {}
}
