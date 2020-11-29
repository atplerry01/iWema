import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlatDocComponent } from './alat-doc.component';

describe('AlatDocComponent', () => {
  let component: AlatDocComponent;
  let fixture: ComponentFixture<AlatDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlatDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlatDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
