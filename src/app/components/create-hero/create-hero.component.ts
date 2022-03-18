import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuid } from 'uuid';
import { finalize, Subscription } from 'rxjs';
import { HeroService } from 'src/app/services/hero.service';
import { IDbHeroSnapshotIn } from 'src/app/types/types';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-create-hero',
  templateUrl: './create-hero.component.html',
  styleUrls: ['./create-hero.component.scss'],
})
export class CreateHeroComponent implements OnInit {
  fileName = '';
  uploaded_img = '';
  uploadProgress: number | null = null;
  uploadSub: Subscription | undefined;

  logo_title = 'Hero facktory';
  id = '';
  name = '';
  gender = '';
  species = '';
  photo = '';

  is_edit_mode = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroService: HeroService,
    private http: HttpClient
  ) {}

  applyEditHeroData(hero: IDbHeroSnapshotIn | undefined): void {
    if (!hero) return;
    this.id = hero.id;
    this.name = hero.name;
    this.gender = hero.gender ?? '';
    this.species = hero.species ?? '';
    this.photo = hero.photo ?? '';
    this.uploaded_img = `${environment.SRV_NODE}${hero.photo}`;
  }

  cancelUpload() {
    this.uploadSub?.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = undefined;
  }

  addHero(): void {
    if (!this.name) {
      return;
    }

    const newHero: IDbHeroSnapshotIn = {
      id: uuid(),
      name: this.name.trim(),
      gender: this.gender.trim(),
      species: this.species.trim(),
      photo: this.photo,
    };

    // this.heroService.addHero(newHero).subscribe();
    this.heroService.insertNewHero(newHero);
    this.clearData();

    console.log('hero added');
  }

  updateHero(): void {
    if (!this.name) {
      return;
    }

    const updatedHero: IDbHeroSnapshotIn = {
      id: this.id,
      name: this.name.trim(),
      gender: this.gender.trim(),
      species: this.species.trim(),
      photo: this.photo,
    };

    // this.heroService.addHero(newHero).subscribe();
    this.heroService.updateExistingHero(updatedHero);
    this.clearData();

    console.log('hero updated');
  }

  clearData(): void {
    this.logo_title = '';
    this.name = '';
    this.gender = '';
    this.species = '';
    this.uploaded_img = '';
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

  onFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file: File = files?.[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append('thumbnail', file);

      const upload$ = this.http
        .post(environment.SRV_NODE_UPLOAD_HERO_IMAGE, formData, {
          reportProgress: true,
          observe: 'events',
        })
        .pipe(finalize(() => this.reset()));

      this.uploadSub = upload$.subscribe((event) => {
        if (event.type === 4 && event.body) {
          const event_data: HttpResponse<{
            data?: { name: string };
          }> | null = event;

          if (event_data?.body?.data?.name) {
            const name = event_data?.body?.data?.name;
            this.uploaded_img = `${environment.SRV_NODE}${name}`;
            this.photo = name;
          }
        }
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(
            100 * (event.loaded / (event.total ?? 1))
          );
        }
      });
    }
  }

  ngOnInit(): void {
    this.is_edit_mode = false;

    this.activatedRoute.params.subscribe((params) => {
      if (!params['id']) return;
      this.heroService
        .getHeroById(params['id'])
        .valueChanges.subscribe(({ data, loading }) => {
          if (!loading) {
            console.table(data.heroes[0]);
            this.applyEditHeroData(data.heroes[0]);
          }
        });
      this.is_edit_mode = true;
    });
  }
}
