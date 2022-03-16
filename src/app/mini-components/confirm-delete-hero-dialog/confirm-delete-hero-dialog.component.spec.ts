import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteHeroDialogComponent } from './confirm-delete-hero-dialog.component';

describe('ConfirmDeleteHeroDialogComponent', () => {
  let component: ConfirmDeleteHeroDialogComponent;
  let fixture: ComponentFixture<ConfirmDeleteHeroDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteHeroDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteHeroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
