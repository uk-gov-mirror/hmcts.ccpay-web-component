import { BrowserModule } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { CcdHyphensPipe } from './ccd-hyphens.pipe';

describe('ccd hyphens pipe', () => {
  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          BrowserModule
        ]
      });
  });

  it('Should create an instance for CCD hyphen pipe and transform non-hyphenated CCD number to hyphenated CCD number',() => {
  
    const pipe = new CcdHyphensPipe();
    expect(pipe).toBeTruthy();
    expect(pipe.transform('1111222233334444')).toBe('1111-2222-3333-4444');

  });

  it('Should not transform hyphenated CCD number', () => {
    const pipe = new CcdHyphensPipe();
    expect(pipe.transform('1111-2222-3333-4444')).toBe('1111-2222-3333-4444');
  });
});
