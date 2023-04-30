import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilEmployeComponent } from './profil-employe.component';

describe('ProfilEmployeComponent', () => {
  let component: ProfilEmployeComponent;
  let fixture: ComponentFixture<ProfilEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilEmployeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
