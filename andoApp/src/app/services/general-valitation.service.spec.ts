import { TestBed } from '@angular/core/testing';

import { GeneralValitationService } from './general-valitation.service';

describe('GeneralValitationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralValitationService = TestBed.get(GeneralValitationService);
    expect(service).toBeTruthy();
  });
});
