import { TestBed, inject } from '@angular/core/testing';

import { Core\authService } from './core\auth.service';

describe('Core\authService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Core\authService]
    });
  });

  it('should be created', inject([Core\authService], (service: Core\authService) => {
    expect(service).toBeTruthy();
  }));
});
