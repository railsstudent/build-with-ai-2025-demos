import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

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
  docs = signal([
    {
      title: 'WebLLM Home',
      url: 'https://webllm.mlc.ai/docs'
    },
    {
      title: 'MLC Complete Model List',
      url: 'https://mlc.ai/models'
    },
    {
      title: 'WebLLM Model List',
      url: 'https://github.com/mlc-ai/web-llm/blob/main/src/config.ts#L311'
    },
    {
      title: 'WebLLM Examples',
      url: 'https://github.com/mlc-ai/web-llm/tree/main/examples'
    },
  ]);
}
