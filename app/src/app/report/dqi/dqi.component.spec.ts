import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DQIComponent } from './dqi.component';

describe('DQIComponent', () => {
  let component: DQIComponent;
  let fixture: ComponentFixture<DQIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DQIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DQIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
