import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSidemenuComponent } from './dashboard-sidemenu.component';

describe('DashboardSidemenuComponent', () => {
  let component: DashboardSidemenuComponent;
  let fixture: ComponentFixture<DashboardSidemenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSidemenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
