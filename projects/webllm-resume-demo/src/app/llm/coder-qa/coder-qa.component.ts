import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LlmCacheUsageComponent } from '../llm-cache-usage/llm-cache-usage.component';
import { CODER_MODEL_LIST_PROVIDER } from '../llm-models.constant';

@Component({
  selector: 'app-coder-qa',
  imports: [LlmCacheUsageComponent],
  template: `
    <h2>CV Analyzer LLM</h2>
    <app-llm-cache-usage />
  `,
  providers: [CODER_MODEL_LIST_PROVIDER],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CoderQAComponent {

}
