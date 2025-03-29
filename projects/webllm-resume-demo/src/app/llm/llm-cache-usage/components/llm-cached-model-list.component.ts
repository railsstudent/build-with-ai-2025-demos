import { ChangeDetectionStrategy, Component, computed, input, resource } from '@angular/core';
import { hasModelInCache } from '@mlc-ai/web-llm';
import { LLMModel } from '../../types/llm-model.type';

@Component({
  selector: 'app-llm-cached-model-list',
  template: `
    @if (cacheModelIds().length > 0) {
      <h3>Cached Models</h3>
      <ol>
          @for (m of cacheModelIds(); track m) {
            <li>{{ m }}</li>
          }
      </ol>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LlmCachedModelListComponent {
  allModels = input<LLMModel[]>([]);
  cacheModelIds = input.required<string[]>();
}
