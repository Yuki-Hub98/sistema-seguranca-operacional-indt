import { TestBed } from '@angular/core/testing';

import { Sidebarservice } from './sidebarservice';

describe('Sidebarservice', () => {
  let service: Sidebarservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sidebarservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
