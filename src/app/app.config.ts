import {ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import {notezExplorerReducer} from './notez-explorer/core/notez-explorer.reducer';
import * as notezExplorerEffects from './notez-explorer/core/notez-explorer.effects';
import * as notezEffects from './notez/core/notez.efffects';
import { provideEffects } from '@ngrx/effects';
import {notezReducer} from './notez/core/notez.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({
        notezExplorer: notezExplorerReducer,
        widgets: notezReducer
    }),
    provideEffects(notezExplorerEffects, notezEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
