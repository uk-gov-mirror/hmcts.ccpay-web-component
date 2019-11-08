import { BrowserModule } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { keyValuePipe } from './key-value.pipe';

describe('key value pipe', () => {
  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          BrowserModule
        ]
      });
  });

  it('Should cr',() => {
    const pipe = new keyValuePipe();
    expect(pipe).toBeTruthy();
  });
});
