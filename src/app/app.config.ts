import {ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import {notezExplorerReducer} from './notez-explorer/core/notez-explorer.reducer';
import * as notezExplorerEffects from './notez-explorer/core/notez-explorer.effects';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({
        notezExplorer: notezExplorerReducer
    }),
    provideEffects(notezExplorerEffects),
  ]
};
