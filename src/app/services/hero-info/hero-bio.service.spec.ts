import { TestBed } from '@angular/core/testing';

import { HeroBioService } from './hero-bio.service';

describe('HeroBioService', () => {
  let service: HeroBioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroBioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
