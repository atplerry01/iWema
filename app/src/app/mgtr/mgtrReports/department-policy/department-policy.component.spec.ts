import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentPolicyComponent } from './department-policy.component';

describe('DepartmentPolicyComponent', () => {
  let component: DepartmentPolicyComponent;
  let fixture: ComponentFixture<DepartmentPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
