import { Directive, ElementRef, inject, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appStageColor]',
})
export class StageColorDirective implements OnInit {
  private readonly elementRef = inject(ElementRef);
  @Input() appStageColor = ''; // Входной параметр, текст, который будет использоваться для определения цвета

  ngOnInit() {
    // Применяем цвет в зависимости от текста
    this.elementRef.nativeElement.style.background =
      this.applyBackgroundColor();
  }

  private applyBackgroundColor(): string {
    switch (this.appStageColor) {
      case 'Неразобранное':
        return '#99CCFD';
      case 'Переговоры':
        return '#FFFF99';
      case 'Принимают решение':
        return '#FFCC66';
      case 'Успешно':
        return '#CCFF66';
      default:
        return '#FFFFFF';
    }
  }
}
