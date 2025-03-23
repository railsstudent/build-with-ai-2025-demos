import { ChangeDetectionStrategy, Component, inject, Injector } from '@angular/core';
import { deleteModelAllInfoInCache, hasModelInCache } from '@mlc-ai/web-llm';
import { LlmSelectModelComponent } from '../llm-select-model/llm-select-model.component';
import { EngineService } from '../services/engine.service';

@Component({
  selector: 'app-llm-cache-usage',
  imports: [LlmSelectModelComponent],
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
          <p>Progress: {{ progressResource.value() }}</p>
      } 
      Ready: {{ ready()}}
      <div style="display: flex; justify-content: space-between;">
        @let modelName = selectedModel().name;
        <button (click)="reloadModel()">Reload {{ modelName }} to engine</button>
        <button (click)="deleteModelFromCache()">Delete {{ modelName }}</button>
        <button (click)="deleteAllModelsFomCache()">Delete all models</button>
      </div>
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
  ready = this.engineService.ready;
  
  engine = this.engineService.createEngineSignal(this.injector);
  engineError = this.engineService.engineError;

  async deleteModelFromCache() {
    await this.#deleteModelFromCacheById(this.selectedModel().model);
  }

  async #deleteModelFromCacheById(model: string) {
    if (await hasModelInCache(model)) {
      await deleteModelAllInfoInCache(model);
      console.log(`Delete ${model} from the cache`);
    }
  }

  async deleteAllModelsFomCache() {
    const promises = this.models().map(({ model }) => 
      this.#deleteModelFromCacheById(model));
    
    await Promise.allSettled(promises);
  }

  async reloadModel() {
    await this.engine()?.reload(this.selectedModel().model);
  }
}
