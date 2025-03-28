import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ResourcesService } from './services/resources.service';

@Component({
  selector: 'app-webllm-resources',
  template: `
    <h3>Useful Links:</h3>
    <ol>
      @for (doc of docs(); track doc.title) {
        <li><a [href]="doc.url" target="_blank">{{ doc.title}}</a></li>
      }  
    </ol>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebLLMResourcesComponent {
  docs = inject(ResourcesService).resources;
}
