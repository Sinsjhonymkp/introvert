import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appCloseAccordion]',
})
export class CloseAccordionDirective {
  @Output() public clickOutside = new EventEmitter<void>();

  private readonly elementRef = inject(ElementRef);

  @HostListener('document:click', ['$event']) onClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
