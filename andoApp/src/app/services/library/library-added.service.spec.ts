import { TestBed } from '@angular/core/testing';

import { LibraryAddedService } from './library-added.service';

describe('LibraryAddedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LibraryAddedService = TestBed.get(LibraryAddedService);
    expect(service).toBeTruthy();
  });
});
