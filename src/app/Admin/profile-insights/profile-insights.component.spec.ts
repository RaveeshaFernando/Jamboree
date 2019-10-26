import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInsightsComponent } from './profile-insights.component';

describe('ProfileInsightsComponent', () => {
  let component: ProfileInsightsComponent;
  let fixture: ComponentFixture<ProfileInsightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileInsightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
