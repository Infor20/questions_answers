import { TestBed } from '@angular/core/testing';

import { PanelistsService } from './panelists.service';

describe('PanelistsService', () => {
  let service: PanelistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanelistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
