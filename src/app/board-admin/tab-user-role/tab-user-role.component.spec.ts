import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabUserRoleComponent } from './tab-user-role.component';

describe('TabUserRoleComponent', () => {
  let component: TabUserRoleComponent;
  let fixture: ComponentFixture<TabUserRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabUserRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabUserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
