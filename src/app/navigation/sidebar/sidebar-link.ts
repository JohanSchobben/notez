import {Component, computed, input} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'ntz-sidebar-link',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <a [routerLink]="route()"
       routerLinkActive="!bg-indigo-100 !text-indigo-700"
       [routerLinkActiveOptions]="routerLinkActiveOptions()"
       class="flex items-center gap-3 px-4 py-3 text-slate-500 !hover:text-indigo-600 !hover:bg-slate-100 rounded-lg transition-colors font-manrope font-medium text-sm">
      <span class="material-symbols-outlined inline-block w-[20px]">{{ icon() }}</span>
      <span>{{ label() }}</span>
    </a>
  `
})
export class SidebarLink {
  public readonly icon = input.required<string>();
  public readonly label = input.required<string>();
  public readonly route = input.required<string>();
  protected readonly routerLinkActiveOptions = computed(() => {
    return {
      exact: this.route() === '/',
    }
  });
}
