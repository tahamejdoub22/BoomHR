import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrCandidateDashboardComponent } from './hr-candidate-dashboard.component';

describe('HrCandidateDashboardComponent', () => {
  let component: HrCandidateDashboardComponent;
  let fixture: ComponentFixture<HrCandidateDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrCandidateDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrCandidateDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
