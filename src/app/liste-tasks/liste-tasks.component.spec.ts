import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTasksComponent } from './liste-tasks.component';

describe('ListeTasksComponent', () => {
  let component: ListeTasksComponent;
  let fixture: ComponentFixture<ListeTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
