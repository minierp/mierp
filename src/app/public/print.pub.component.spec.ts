import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPubComponent } from './print.pub.component';

describe('PrintPubComponent', () => {
  let component: PrintPubComponent;
  let fixture: ComponentFixture<PrintPubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintPubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
