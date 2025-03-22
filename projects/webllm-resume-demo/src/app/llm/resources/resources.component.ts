import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-webllm-resources',
  template: `
    <h3>Useful Links:</h3>
    <ol>
      <li><a href="https://mlc.ai/models" target="_blank">WebLLM Model List</a></li>
      <li>
        <a href="https://github.com/mlc-ai/web-llm/tree/main/examples" target="_blank">
          WebLLM Examples
        </a>
      </li>
    </ol>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebLLMResourcesComponent {}
