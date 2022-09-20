import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoLoadingComponent } from './logo-loading.component';

describe('LogoLoadingComponent', () => {
  let component: LogoLoadingComponent;
  let fixture: ComponentFixture<LogoLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
