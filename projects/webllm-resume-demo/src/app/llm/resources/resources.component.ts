import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ResourcesService } from './services/resources.service';

@Component({
  selector: 'app-webllm-resources',
  template: `
    <h3>Useful Links:</h3>
    <ol>
      @for (page of pages(); track page.title) {
        <li><a [href]="page.url" target="_blank">{{ page.title}}</a></li>
      }  
    </ol>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class WebLLMResourcesComponent {
  service = inject(ResourcesService);
  
  pages = toSignal(this.service.pages$, { initialValue: []} );
}
