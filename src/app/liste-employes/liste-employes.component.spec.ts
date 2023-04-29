import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEmployesComponent } from './liste-employes.component';

describe('ListeEmployesComponent', () => {
  let component: ListeEmployesComponent;
  let fixture: ComponentFixture<ListeEmployesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeEmployesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeEmployesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
