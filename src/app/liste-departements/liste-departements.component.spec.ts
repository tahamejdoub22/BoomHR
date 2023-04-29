import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListeDepartementsComponent } from './liste-departementscomponent';


describe('ListeDepartementsComponent', () => {
  let component: ListeDepartementsComponent;
  let fixture: ComponentFixture<ListeDepartementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeDepartementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDepartementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
