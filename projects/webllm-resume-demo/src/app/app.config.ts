import { ApplicationConfig, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideCacheUsageConfig } from './llm/llm-cache-usage/cache-usage.config';
import { APP_STATE_TOKEN } from './app-state/app-state.constant';
import { AppState } from './app-state/app-state.interface';

export const appInitialState: AppState = {
  isLoading: signal(false),
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideCacheUsageConfig({ useIndexDB: false }),
    {
      provide: APP_STATE_TOKEN,
      useValue: appInitialState,
    }
  ]
};
