import { ChangeDetectionStrategy, Component, input, OnInit, signal } from '@angular/core';
import { deleteModelAllInfoInCache, hasModelInCache } from '@mlc-ai/web-llm';
import { LLMModel } from '../types/llm-model.type';
import { LlmSelectModelComponent } from '../llm-select-model/llm-select-model.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-llm-delete-cache',
  imports: [LlmSelectModelComponent],
  template: `
    <div class="layout">
      <div class="delete-dropdown">
        <app-llm-select-model [(selectedModel)]="selectedModel">
          Delete from cache:
        </app-llm-select-model>
        <button (click)="deleteModelFromCache()">Delete</button>
      </div>
      <button (click)="deleteAllModelsFomCache()">Delete all models</button>
    </div>
  `,
  styleUrl: './llm-delete-cache.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LlmDeleteCacheComponent implements OnInit {
  models = input.required<LLMModel[]>();
  selectedModel = signal<LLMModel>({ name: '', model: ''});

  ngOnInit(): void {
    this.selectedModel.set(this.models()[0]);
  }

  async deleteModelFromCache() {
    const model = this.selectedModel();
    if (!model) {
      return;
    }
    await this.#deleteModelFromCacheById(model.model);
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
}
