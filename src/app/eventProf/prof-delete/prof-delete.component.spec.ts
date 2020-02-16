import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfDeleteComponent } from './prof-delete.component';

describe('ProfDeleteComponent', () => {
  let component: ProfDeleteComponent;
  let fixture: ComponentFixture<ProfDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
