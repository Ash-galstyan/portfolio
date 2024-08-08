import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Directive({
  selector: '[appGradulaText]',
  standalone: true
})
export class GradualTextDirective {
  @Input() gradualText: string = '';
  @Input() interval: number = 40;
  @Output() animated = new EventEmitter<boolean>();

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.animateText();
  }

  animateText() {
    let index = 0;
    const interval = setInterval(() => {
      if (index < this.gradualText.length) {
        this.el.nativeElement.textContent += this.gradualText[index];
        index++;
      } else {
        clearInterval(interval);
        this.animated.emit(true);
      }
    }, this.interval);
  }
}
