import {booleanAttribute, Component, HostBinding, input} from '@angular/core';

@Component({
  selector: 'button[ntzButton]',
  template: '<ng-content/>',
  host: {
    class: `justify-center gap-2
    px-4 font-semibold text-sm
    rounded-lg transition-all duration-200
    active:scale-[0.98]`
  }
})
export class Button {
  color = input<"primary" | "text">("primary");
  block = input(false, {transform: booleanAttribute});
  dense = input(false, {transform: booleanAttribute});

  @HostBinding('class')
  get hostClasses() {
    let classes = "";
    if (this.color() === 'primary') {
      classes += "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
    } else {
      classes += "bg-transparent text-gray-600 hover:text-gray-700 active:bg-gray-100"
    }

    if (this.block()) {
      classes += " w-full"
    }

    if (this.dense()) {
      classes += " py-1"
    } else {
      classes += " py-3"
    }
    return classes;
  }
}
