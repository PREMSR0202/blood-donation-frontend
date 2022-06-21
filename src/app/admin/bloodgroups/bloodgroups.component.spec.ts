import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodgroupsComponent } from './bloodgroups.component';

describe('BloodgroupsComponent', () => {
  let component: BloodgroupsComponent;
  let fixture: ComponentFixture<BloodgroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodgroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
