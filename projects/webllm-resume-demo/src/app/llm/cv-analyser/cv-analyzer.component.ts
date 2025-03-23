import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LlmCacheUsageComponent } from '../llm-cache-usage/llm-cache-usage.component';
import { LLM_MODEL_LIST } from '../llm-models.constant';
import { EngineService } from '../services/engine.service';

@Component({
  selector: 'app-cv-analyser',
  imports: [LlmCacheUsageComponent],
  template: `
    <h2>CV Analyzer LLM</h2>
    <app-llm-cache-usage />
  `,
  providers: [
    {
      provide: LLM_MODEL_LIST,
      useFactory: () => {
        const service = inject(EngineService);
        return service.models;
      }
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CVAnalyzerComponent {}
