import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { inject, TestBed } from '@angular/core/testing';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';

describe('Sanitize Html Pipe', () => {
  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          BrowserModule
        ]
      });
  });

  it('Should create an instance', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new SanitizeHtmlPipe(domSanitizer);
    expect(pipe).toBeTruthy();
  }));

  it('Should transform', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new SanitizeHtmlPipe(domSanitizer);
    expect(pipe.transform('<p>test</p>')).toBeTruthy();
  }));
});
