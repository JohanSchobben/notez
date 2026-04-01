import {booleanAttribute, Component, computed, HostBinding, input, output} from '@angular/core';

@Component({
  selector: 'ntz-tag',
  template: `
    {{ name() }}
    @if (removeAble()) {
      <span class="material-symbols-outlined inline-block ml-1 -mr-2 text-[6px] cursor-default" (click)="removed.emit()">
        close
      </span>
    }
  `,
  styles: `
    @reference '../../../tailwind.css';
    :host {
      @apply inline-flex items-center px-3 rounded-lg text-sm/6 font-medium tracking-wide;
    }
  `,
})
export class Tag {
  name = input.required<string>();
  removeAble = input(false, {transform: booleanAttribute});
  removed = output();

  private hue = computed(() => {
    let hash = 0;
    const name = this.name();

    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + hash * 31;
    }
    return hash % 360;
  });

  @HostBinding('style.background-color')
  public get backgroundColor(): string {
    return `hsl(${this.hue()}, 72%, 91%)`;
  }

  @HostBinding('style.color')
  public get color(): string {
    return `hsl(${this.hue()}, 72%, 20%)`;
  }

}
