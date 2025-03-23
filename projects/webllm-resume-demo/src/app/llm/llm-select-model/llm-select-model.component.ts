import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EngineService } from '../services/engine.service';

@Component({
  selector: 'app-llm-select-model',
  imports: [FormsModule],
  template: `
    <div style="margin-bottom:0.5rem;">
      <label for="models">
        <ng-content>Models: </ng-content>
      </label>
      <select id="models" name="models" [(ngModel)]="selectedModel">
        @for (model of models(); track model) {
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

  models = this.engineService.models;
  selectedModel = model(this.models()[0]);
}
