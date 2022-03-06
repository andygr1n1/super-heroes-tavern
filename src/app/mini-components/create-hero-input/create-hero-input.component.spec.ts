import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHeroInputComponent } from './create-hero-input.component';

describe('CreateHeroInputComponent', () => {
  let component: CreateHeroInputComponent;
  let fixture: ComponentFixture<CreateHeroInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHeroInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHeroInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
