import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LlmCacheUsageComponent } from '../llm-cache-usage/llm-cache-usage.component';

@Component({
  selector: 'app-cv-analyser',
  imports: [FormsModule, LlmCacheUsageComponent],
  templateUrl: './cv-analyzer.component.html',
  styles: `
    .error {
      color: red;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CVAnalyzerComponent {}
