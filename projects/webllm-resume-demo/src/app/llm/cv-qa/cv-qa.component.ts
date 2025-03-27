import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MLCEngine } from '@mlc-ai/web-llm';
import { LlmCacheUsageComponent } from '../llm-cache-usage/llm-cache-usage.component';
import { MODEL_LIST_PROVIDER } from '../llm-models.constant';
import { LlmResponseComponent } from '../llm-response/llm-response.component';

@Component({
  selector: 'app-cv-qa',
  imports: [LlmCacheUsageComponent, LlmResponseComponent],
  template: `
    <h2>CV Question and Answering</h2>
    <app-llm-cache-usage (selectedEngine)="engine.set($event)" />
    @if (engine()) {
      <app-llm-response [engine]="engine()" [systemPrompt]="systemPrompt()">
        <ng-container title>Does the candidate have the skills</ng-container>
      </app-llm-response>
    } @else {
      <p>--- No engine loaded ---</p>
    }
  `,
  providers: [MODEL_LIST_PROVIDER]
,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CVQuestionAndAnswerComponent {
  engine = signal<MLCEngine | undefined>(undefined);
  systemPrompt = signal('You are a helpful assistant who can solve any coding problem. If you do not know the answer, please reply "I do not know" and stop.');
}
