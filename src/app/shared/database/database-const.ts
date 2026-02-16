import {InjectionToken} from '@angular/core';

export const DATABASE_NAME: InjectionToken<string> = new InjectionToken<string>('DATABASE_NAME', {
  providedIn: "root",
  factory: () => 'spreadsheet_db'
});

export const DATABASE_VERSION: InjectionToken<number> = new InjectionToken<number>('DATABASE_VERSION', {
  providedIn: "root",
  factory: () => 1
});
