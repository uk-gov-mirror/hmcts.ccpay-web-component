import { TestBed, inject } from '@angular/core/testing';

import { XlFileService } from './xl-file.service';

describe('XlFileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XlFileService]
    });
  });

  it('should be created', inject([XlFileService], (service: XlFileService) => {
    expect(service).toBeTruthy();
  }));
});
