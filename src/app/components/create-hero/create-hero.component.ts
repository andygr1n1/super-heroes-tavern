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
  name = '';

  constructor(private heroService: HeroService) {}

  addHero(): void {
    console.log('hero added');
    if (!this.name) {
      alert('name is empty');
      return;
    }

    const newHero: IDbHeroSnapshotIn = {
      id: nanoid(),
      name: this.name.trim(),
    };

    this.heroService.addHero(newHero).subscribe();
  }

  ngOnInit(): void {}
}
