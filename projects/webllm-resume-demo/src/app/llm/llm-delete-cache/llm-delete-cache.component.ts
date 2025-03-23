import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { deleteModelAllInfoInCache, hasModelInCache, MLCEngine } from '@mlc-ai/web-llm';
import { APP_STATE_TOKEN } from '../../app-state.constant';
import { LlmSelectModelComponent } from '../llm-select-model/llm-select-model.component';
import { LLMModel } from '../types/llm-model.type';

@Component({
  selector: 'app-llm-delete-cache',
  imports: [LlmSelectModelComponent],
  template: `
    <div class="layout">
      <div class="delete-dropdown">
        <app-llm-select-model [(selectedModel)]="selectedModel">
          Delete from cache:
        </app-llm-select-model>
        <button (click)="deleteModelFromCache()" [disabled]="isLoading()">Delete</button>
      </div>
      <button (click)="deleteAllModelsFomCache()" [disabled]="isLoading()">Delete all models</button>
    </div>
  `,
  styleUrl: './llm-delete-cache.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LlmDeleteCacheComponent implements OnInit {
  models = input.required<LLMModel[]>();
  selectedModel = signal<LLMModel>({ name: '', model: ''});
  engine = input<MLCEngine | undefined>(undefined);

  isLoading = inject(APP_STATE_TOKEN).isLoading;

  ngOnInit(): void {
    this.selectedModel.set(this.models()[0]);
  }

  async deleteModelFromCache() {
    try {
      this.isLoading.set(true);
      const model = this.selectedModel();
      if (!model) {
        return;
      }
      await this.#deleteModelFromCacheById(model.model);
    } finally {
      this.isLoading.set(false);
    }
  }

  async #deleteModelFromCacheById(model: string) {
    if (await hasModelInCache(model)) {
      await deleteModelAllInfoInCache(model);
      console.log(`Delete ${model} from the cache`);
    }
  }

  async deleteAllModelsFomCache() {
    try {
      this.isLoading.set(true);

      const promises = this.models().map(({ model }) => 
        this.#deleteModelFromCacheById(model));
      
      await Promise.allSettled(promises);
      await this.engine()?.unload();
    } finally {
      this.isLoading.set(false);
    }
  }
}
