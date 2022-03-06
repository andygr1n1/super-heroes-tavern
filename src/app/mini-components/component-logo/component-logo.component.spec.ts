import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentLogoComponent } from './component-logo.component';

describe('ComponentLogoComponent', () => {
  let component: ComponentLogoComponent;
  let fixture: ComponentFixture<ComponentLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
