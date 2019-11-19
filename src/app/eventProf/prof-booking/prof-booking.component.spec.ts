import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfBookingComponent } from './prof-booking.component';

describe('ProfBookingComponent', () => {
  let component: ProfBookingComponent;
  let fixture: ComponentFixture<ProfBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
