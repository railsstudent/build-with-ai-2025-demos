import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LlmCacheUsageComponent } from '../llm-cache-usage/llm-cache-usage.component';

@Component({
  selector: 'app-cv-analyser',
  imports: [LlmCacheUsageComponent],
  template: `
    <h2>CV Analyzer LLM</h2>
    <app-llm-cache-usage />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CVAnalyzerComponent {}
