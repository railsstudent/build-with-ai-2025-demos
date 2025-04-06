import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppNavComponent } from './app-nav/app-nav.component';

@Component({
  selector: 'app-root',
  imports: [AppNavComponent, RouterOutlet],
  template: `
    <app-app-nav />
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
