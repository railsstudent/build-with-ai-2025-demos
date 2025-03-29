import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MLCEngine } from '@mlc-ai/web-llm';
import { LlmCacheUsageComponent } from '../llm-cache-usage';
import { MATH_MODEL_LIST_PROVIDER } from '../llm-models.constant';
import { LlmResponseComponent } from '../llm-response/llm-response.component';

@Component({
  selector: 'app-math-qa',
  imports: [LlmCacheUsageComponent, LlmResponseComponent],
  template: `
    <h2>Math LLM</h2>
    <app-llm-cache-usage (selectedEngine)="engine.set($event)" />
    @if (engine()) {
      <app-llm-response [engine]="engine()" [systemPrompt]="systemPrompt()"
        [(query)]="query">
        <ng-container title>Mathematics Corner</ng-container>
      </app-llm-response>
    } @else {
      <p>--- No engine loaded ---</p>
    }    
  `,
  providers: [MATH_MODEL_LIST_PROVIDER],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MathQAComponent {
  engine = signal<MLCEngine | undefined>(undefined);
  systemPrompt = signal(`You are a helpful assistant who can solve any math problem. When solving equations, please do not consider complex numbers. 
Provide your reasoning in each step until the final answers are calculated. If you do not know the answer, please reply "I do not know" and stop.`);
  query = signal('x^2 + x^0 = 10, what is the value of x^3?');
}
