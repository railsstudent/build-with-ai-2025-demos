import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MLCEngine } from '@mlc-ai/web-llm';
import { LlmCacheUsageComponent } from '../llm-cache-usage';
import { CODER_MODEL_LIST_PROVIDER } from '../llm-models.constant';
import { LlmResponseComponent } from '../llm-response/llm-response.component';

@Component({
  selector: 'app-coder-qa',
  imports: [LlmCacheUsageComponent, LlmResponseComponent],
  template: `
    <h2>Coder LLM</h2>
    <app-llm-cache-usage (selectedEngine)="engine.set($event)" />
    @if (engine()) {
      <app-llm-response [engine]="engine()" [systemPrompt]="systemPrompt()"
        [(query)]="query">
        <ng-container title>Let's write some code</ng-container>
      </app-llm-response>
    } @else {
      <p>--- No engine loaded ---</p>
    }
  `,
  providers: [CODER_MODEL_LIST_PROVIDER],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CoderQAComponent {
  engine = signal<MLCEngine | undefined>(undefined);
  systemPrompt = signal('You are a helpful assistant who can solve any coding problem. If you do not know the answer, please reply "I do not know" and stop.');
  query = signal('Please write a function to merge sort a list of numbers in ascending order.');
}
