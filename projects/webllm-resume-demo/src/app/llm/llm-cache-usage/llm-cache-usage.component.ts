import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Injector, signal } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { LlmDeleteCacheComponent } from '../llm-delete-cache/llm-delete-cache.component';
import { LLM_MODEL_LIST } from '../llm-models.constant';
import { LlmSelectModelComponent } from '../llm-select-model/llm-select-model.component';
import { EngineService } from '../services/engine.service';
import { LLMModel } from './../types/llm-model.type';

@Component({
  selector: 'app-llm-cache-usage',
  imports: [LlmSelectModelComponent, LlmDeleteCacheComponent, AsyncPipe],
  template: `
    <app-llm-select-model [(selectedModel)]="selectedModel" />
    @if (engineError()) {
      <div>
        <label for="error">Engine Error:&nbsp;&nbsp;</label>
        <span class='error' id="error" name="error">{{ engineError() }}</span>
      </div>
    } @else {
      @if (progressResource.error()) {
          <p class='error'>Error: {{ progressResource.error() }}</p>
      } @else if (progressResource.hasValue()) {
          <p>Download Model Progress: {{ progressResource.value() }}</p>
      } 
      <app-llm-delete-cache [engine]="engine$ | async" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LlmCacheUsageComponent {
  injector = inject(Injector);
  engineService = inject(EngineService);;
  models = inject(LLM_MODEL_LIST);
  
  selectedModel = signal<LLMModel>(this.models[0]);

  progressResource = this.engineService.createProgressResource(this.injector);  
  engine$ = this.engineService.createEngine(this.selectedModel, this.injector);
  engineError = this.engineService.engineError;

  selectEngine = outputFromObservable(this.engine$);
}
