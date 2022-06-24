import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindNearestEmployeeComponent } from './find-nearest-employee.component';

describe('FindNearestEmployeeComponent', () => {
  let component: FindNearestEmployeeComponent;
  let fixture: ComponentFixture<FindNearestEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindNearestEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindNearestEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
