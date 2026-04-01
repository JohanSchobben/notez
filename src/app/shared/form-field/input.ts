import {Directive} from '@angular/core';

@Directive({
  selector: '[ntzInput]',
  host: {
    class: `w-full px-4 py-3 bg-indigo-50 border font-bold border-slate-200 rounded-lg text-slate-900 font-manrope text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200`
  }
})
export class Input {}
