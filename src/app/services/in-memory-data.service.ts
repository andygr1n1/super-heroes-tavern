import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService {
  createDb() {
    const heroes_collection = [
      {
        id: '1',
        name: 'Ancient One',
        species: 'Human',
        gender: 'Female',
        birthDay: '1316',
        deathDay: '2017',
        status: 'Deceased',
        actors: 'Tilda Swinton',
        photo: './assets/heroesImg/ancientOne.png',
        movies: ['Doctor Strange', 'Avengers: Endgame'],
      },
    ];
    return { heroes_collection };
  }
  constructor() {}
}
