import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APP_STATE_TOKEN } from '../../app-state/app-state.constant';
import { LLM_MODEL_LIST } from '../llm-models.constant';
import { EngineService } from '../services/engine.service';
import { LLMModel } from '../types/llm-model.type';

@Component({
  selector: 'app-llm-select-model',
  imports: [FormsModule],
  template: `
    <div style="margin-bottom:0.5rem;">
      <label for="models">
        <ng-content>Models: </ng-content>
      </label>
      <select id="models" name="models" [(ngModel)]="selectedModel" [disabled]="isLoading()">
        @for (model of models; track model) {
          @let text = model.name ? model.name : '-------';
          <option [ngValue]="model">{{ text }}</option>
        }
      </select>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LlmSelectModelComponent {
  engineService = inject(EngineService);
  isLoading = inject(APP_STATE_TOKEN).isLoading;
  models = inject(LLM_MODEL_LIST);

  selectedModel = model.required<LLMModel>();
}
