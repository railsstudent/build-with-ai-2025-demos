import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EngineService } from '../services/engine.service';

@Component({
  selector: 'app-llm-select-model',
  imports: [FormsModule],
  template: `
    <label for="models">Models: </label>
    <select id="models" name="models" [(ngModel)]="selectedModel">
      @for (model of models(); track model) {
        <option [value]="model">{{ model }}</option>
      }
    </select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LlmSelectModelComponent {
  engineService = inject(EngineService);

  models = this.engineService.models;
  selectedModel = model(this.models()[0]);
}
