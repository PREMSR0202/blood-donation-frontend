import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodDonarsGroupComponent } from './blood-donars-group.component';

describe('BloodDonarsGroupComponent', () => {
  let component: BloodDonarsGroupComponent;
  let fixture: ComponentFixture<BloodDonarsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodDonarsGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodDonarsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
