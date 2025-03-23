import { WritableSignal } from '@angular/core';

export interface AppState {
    isLoading: WritableSignal<boolean>;
}
