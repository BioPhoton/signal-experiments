import { Component, DoCheck, ElementRef, signal } from '@angular/core';

@Component({
  selector: 'dirty-check',
  standalone: true,
  template: `
    <span class="renders">{{checked()}}</span>
  `
})
export class DirtyCheck implements DoCheck {

  checked = signal(0);

  ngDoCheck(): void {
    this.checked.update(v => v + 1);
  }
}
