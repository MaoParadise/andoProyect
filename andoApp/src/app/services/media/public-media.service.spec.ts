import { TestBed } from '@angular/core/testing';

import { PublicMediaService } from './public-media.service';

describe('PublicMediaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublicMediaService = TestBed.get(PublicMediaService);
    expect(service).toBeTruthy();
  });
});
