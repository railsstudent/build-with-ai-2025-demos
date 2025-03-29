import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MLCEngine } from '@mlc-ai/web-llm';
import { CvContentComponent } from './cv-content.component';
import { LlmCacheUsageComponent } from '../../llm-cache-usage/components/llm-cache-usage.component';
import { MODEL_LIST_PROVIDER } from '../../llm-models.constant';
import { LlmResponseComponent } from '../../llm-response/llm-response.component';

@Component({
  selector: 'app-cv-qa',
  imports: [LlmCacheUsageComponent, LlmResponseComponent, FormsModule, CvContentComponent],
  template: `
    <h2>CV Question and Answering</h2>
    <app-llm-cache-usage (selectedEngine)="engine.set($event)" />
    @if (engine()) {
      <app-llm-response [engine]="engine()" [systemPrompt]="systemPrompt()">
        <ng-container title>Find candidate's tech background</ng-container>
        <ng-container context>
          <app-cv-content />
        </ng-container>
      </app-llm-response>
    } @else {
      <p>--- No engine loaded ---</p>
    }
  `,
  styleUrl: './cv-qa.component.scss',
  providers: [MODEL_LIST_PROVIDER],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CVQuestionAndAnswerComponent {
  engine = signal<MLCEngine | undefined>(undefined);
  systemPrompt = signal(`You are a recruiter who can answer whether or not a candidate has the technical skill based on the context. 
If you discover the skill, please reply with "Yes" and quote the job and role. If you cannot find the job, then list the section that the information is found, for example, summary or skill set. 
When the candidate does not have the skill, please reply with "No, the candidate does not have the skill". If you are not sure, please reply "I do not know" and do not make up answers.`);
}
