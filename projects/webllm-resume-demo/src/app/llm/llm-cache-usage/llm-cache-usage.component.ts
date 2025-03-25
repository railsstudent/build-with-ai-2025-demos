import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Injector, resource, signal } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { hasModelInCache } from '@mlc-ai/web-llm';
import { LlmCachedModelListComponent } from '../llm-cached-model-list/llm-cached-model-list.component';
import { LlmDeleteCacheComponent } from '../llm-delete-cache/llm-delete-cache.component';
import { LLM_MODEL_LIST } from '../llm-models.constant';
import { LlmSelectModelComponent } from '../llm-select-model/llm-select-model.component';
import { EngineService } from '../services/engine.service';
import { LLMModel } from './../types/llm-model.type';

@Component({
  selector: 'app-llm-cache-usage',
  imports: [LlmSelectModelComponent, 
    LlmDeleteCacheComponent, 
    AsyncPipe, 
    // LlmCachedModelListComponent,
  ],
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
      <app-llm-delete-cache [engine]="engine$ | async" 
        (cacheChanged)="deletedModel.set($event)" />
      <!-- <app-llm-cached-model-list [allModels]="models" [cacheModelIds]="cachedModelIdsResource.value()" /> -->
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LlmCacheUsageComponent {
  injector = inject(Injector);
  engineService = inject(EngineService);;
  models = inject(LLM_MODEL_LIST);
  
  selectedModel = signal<LLMModel>(this.models[0]);
  deletedModel = signal('');
  #cacheModelIds = signal<string[]>([]);

  cachedModelIdsResource = resource<string[], { progress: number, selectedModel: LLMModel, deletedModel: string }>({
    request: () => ({ 
      progress: this.progress(),
      selectedModel: this.selectedModel(), deletedModel: this.deletedModel() }),
    loader: async ({ request }) => {
      const progress = request.progress;
      const selectedModel = request.selectedModel.model;
      const deletedModel = request.deletedModel;

      const isDeletedModelInCache = deletedModel ? await hasModelInCache(deletedModel) : false;

      if (progress === 1) {
        const isSelectedModelInCache = selectedModel ? await hasModelInCache(selectedModel): false;
        if (isSelectedModelInCache && !this.#cacheModelIds().includes(selectedModel)) {
          this.#cacheModelIds.update((prev) => ([...prev, selectedModel]));
        }
      }

      if (!isDeletedModelInCache && this.#cacheModelIds().includes(deletedModel)) {
        this.#cacheModelIds.update((prev) => 
          prev.filter((item) => item !== deletedModel));
      }

      return this.#cacheModelIds();
    },
    defaultValue: [] as string[],
  });

  progressResource = this.engineService.createProgressResource(this.injector);  
  progress = this.engineService.progress;
  engine$ = this.engineService.createEngine(this.selectedModel, this.injector);
  engineError = this.engineService.engineError;
  selectedEngine = outputFromObservable(this.engine$);
}
