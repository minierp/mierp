import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChkynComponent } from './chkyn.component';

describe('ChkynComponent', () => {
  let component: ChkynComponent;
  let fixture: ComponentFixture<ChkynComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChkynComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChkynComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
