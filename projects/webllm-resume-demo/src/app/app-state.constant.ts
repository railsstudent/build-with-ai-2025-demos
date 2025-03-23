import { InjectionToken } from '@angular/core';
import { AppState } from './app-state.interface';

export const APP_STATE_TOKEN = new InjectionToken<AppState>('APP_STATE_TOKEN');