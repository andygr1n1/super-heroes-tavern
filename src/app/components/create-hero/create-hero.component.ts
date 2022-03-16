import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  name = '';
  gender = '';
  species = '';
  photo = '';

  constructor(private heroService: HeroService, private http: HttpClient) {}

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

  ngOnInit(): void {}
}
