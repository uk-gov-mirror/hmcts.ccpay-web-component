import { BrowserModule } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { AddHyphensPipe } from './../pipes/add-hyphens.pipe';

describe('Add hyphens pipe', () => {
  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          BrowserModule
        ]
      });
  });

  it('Should create an instance and tranform',() => {
    const pipe = new AddHyphensPipe();
    expect(pipe).toBeTruthy();
    expect(pipe.transform('1111222233334444')).toBe('1111-2222-3333-4444');

  });

  it('Should transform', () => {
    const pipe = new AddHyphensPipe();
    expect(pipe.transform('1111-2222-3333-4444')).toBe('1111-2222-3333-4444');
  });
});
