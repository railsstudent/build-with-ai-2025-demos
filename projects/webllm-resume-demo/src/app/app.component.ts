import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CVAnalyserComponent } from './llm/cv-analyser/cv-analyser.component';
import { WebLLMResourcesComponent } from './llm/resources/resources.component';

@Component({
  selector: 'app-root',
  imports: [CVAnalyserComponent, WebLLMResourcesComponent],
  template: `
    <app-cv-analyser />
    <app-webllm-resources />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
