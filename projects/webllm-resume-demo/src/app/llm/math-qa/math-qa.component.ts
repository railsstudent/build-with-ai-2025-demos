import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LlmCacheUsageComponent } from '../llm-cache-usage/llm-cache-usage.component';
import { MATH_MODEL_LIST_PROVIDER } from '../llm-models.constant';
import { LlmResponseComponent } from '../llm-response/llm-response.component';
import { MLCEngine } from '@mlc-ai/web-llm';

@Component({
  selector: 'app-math-qa',
  imports: [LlmCacheUsageComponent, LlmResponseComponent],
  template: `
    <h2>Math LLM</h2>
    <app-llm-cache-usage (selectedEngine)="engine.set($event)" />
    @if (engine()) {
      <app-llm-response [engine]="engine()" [systemPrompt]="systemPrompt()" />
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
If you do not know the answer, please reply "I do not know" and stop.`);
}
