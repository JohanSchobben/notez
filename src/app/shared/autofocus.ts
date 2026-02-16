import {Directive, ElementRef, inject, OnInit} from '@angular/core';

@Directive({
  selector: '[ntzAutofocus]',
})
export class Autofocus implements OnInit {
  private readonly elRef: ElementRef<HTMLElement> = inject(ElementRef);

  public ngOnInit() : void {
    this.elRef.nativeElement.focus();
  }
}
