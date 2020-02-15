import { TestBed, async, inject } from '@angular/core/testing';

import { InnerPageGuard } from './inner-page.guard';

describe('InnerPageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InnerPageGuard]
    });
  });

  it('should ...', inject([InnerPageGuard], (guard: InnerPageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
