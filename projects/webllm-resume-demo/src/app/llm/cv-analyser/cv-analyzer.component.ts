import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LlmCacheUsageComponent } from '../llm-cache-usage/llm-cache-usage.component';
import { LLM_MODEL_LIST, MODEL_LIST_PROVIDER } from '../llm-models.constant';
import { EngineService } from '../services/engine.service';

@Component({
  selector: 'app-cv-analyser',
  imports: [LlmCacheUsageComponent],
  template: `
    <h2>CV Analyzer LLM</h2>
    <app-llm-cache-usage />
  `,
  providers: [MODEL_LIST_PROVIDER]
,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CVAnalyzerComponent {}
