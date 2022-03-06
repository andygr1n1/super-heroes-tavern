import { Component, OnInit } from '@angular/core';
import { nanoid } from 'nanoid';
import { HeroService } from 'src/app/services/hero.service';
import { IDbHeroSnapshotIn } from 'src/app/types/types';

@Component({
  selector: 'app-create-hero',
  templateUrl: './create-hero.component.html',
  styleUrls: ['./create-hero.component.scss'],
})
export class CreateHeroComponent implements OnInit {
  fileName = '';

  logo_title = 'Hero facktory';
  name = '';
  gender = '';
  species = '';

  constructor(private heroService: HeroService) {}

  addHero(): void {
    if (!this.name) {
      alert('name is empty');
      return;
    }

    const newHero: IDbHeroSnapshotIn = {
      id: nanoid(),
      name: this.name.trim(),
      gender: this.gender.trim(),
    };

    this.heroService.addHero(newHero).subscribe();

    console.log('hero added');
  }

  clearData(): void {
    this.logo_title = '';
    this.name = '';
    this.gender = '';
  }

  nameValueChange(value: string) {
    this.name = value;
  }
  genderValueChange(value: string) {
    this.gender = value;
  }

  speciesValueChange(value: string) {
    this.species = value;
  }

  log(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    console.log(files);
  }

  ngOnInit(): void {}
}
