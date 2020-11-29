import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlatGoalComponent } from './alat-goal.component';

describe('AlatGoalComponent', () => {
  let component: AlatGoalComponent;
  let fixture: ComponentFixture<AlatGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlatGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlatGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
