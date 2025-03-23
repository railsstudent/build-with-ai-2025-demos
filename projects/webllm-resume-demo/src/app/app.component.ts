import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppNavComponent } from './app-nav/app-nav.component';
import { WebLLMResourcesComponent } from './llm/resources/resources.component';

@Component({
  selector: 'app-root',
  imports: [AppNavComponent, RouterOutlet, WebLLMResourcesComponent],
  template: `
    <app-app-nav />
    <router-outlet />
    <app-webllm-resources />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
