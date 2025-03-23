import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CVAnalyzerComponent } from './llm/cv-analyser/cv-analyzer.component';
import { WebLLMResourcesComponent } from './llm/resources/resources.component';

@Component({
  selector: 'app-root',
  imports: [CVAnalyzerComponent, WebLLMResourcesComponent],
  template: `
    <app-cv-analyser />
    <app-webllm-resources />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
