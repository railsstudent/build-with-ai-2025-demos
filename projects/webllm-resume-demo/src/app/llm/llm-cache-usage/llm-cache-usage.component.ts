import { ChangeDetectionStrategy, Component, inject, Injector } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { LlmDeleteCacheComponent } from '../llm-delete-cache/llm-delete-cache.component';
import { LlmSelectModelComponent } from '../llm-select-model/llm-select-model.component';
import { EngineService } from '../services/engine.service';

@Component({
  selector: 'app-llm-cache-usage',
  imports: [LlmSelectModelComponent, LlmDeleteCacheComponent],
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
      <app-llm-delete-cache [models]="models()" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LlmCacheUsageComponent {
  injector = inject(Injector);
  engineService = inject(EngineService);

  models = this.engineService.models;
  selectedModel = this.engineService.selectedModel;
  progressResource = this.engineService.createProgressResource(this.injector);  
  engine$ = this.engineService.createEngine(this.injector);
  engineError = this.engineService.engineError;

  selectEngine = outputFromObservable(this.engine$);
}
