import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrApplicantsDashboardComponent } from './hr-applicants-dashboard.component';

describe('HrApplicantsDashboardComponent', () => {
  let component: HrApplicantsDashboardComponent;
  let fixture: ComponentFixture<HrApplicantsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrApplicantsDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrApplicantsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
