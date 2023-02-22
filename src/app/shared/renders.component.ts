import {Component, ElementRef} from '@angular/core';

@Component({
  selector: 'renders',
  standalone: true,
  template: `
    <span class="renders">{{renders()}}</span>
  `
})
export class RendersComponent {
  _renders = 0;

  constructor(private el: ElementRef) {

  }

  renders() {
    this.el.nativeElement.children[0].innerHTML = this._renders++;
  }

}
