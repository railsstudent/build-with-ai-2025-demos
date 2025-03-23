import { computed, inject, Injectable, Injector, resource, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CreateMLCEngine, InitProgressReport, MLCEngineConfig } from '@mlc-ai/web-llm';
import { switchMap, tap } from 'rxjs';
import { APP_STATE_TOKEN } from '../../app-state/app-state.constant';
import { LLMModel } from '../types/llm-model.type';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class EngineService {
  models: LLMModel[] = [
    { model: '', name: ''},
    { model: 'gemma-2-2b-it-q4f32_1-MLC', name: 'gemma-2-2b-it' },
    { model: 'gemma-2-9b-it-q4f32_1-MLC', name: 'gemma-2-9b-it'},
    { model: 'Llama-3.2-3B-Instruct-q4f32_1-MLC', name: 'Llama-3.2-3B-Instruct' },
    { model: 'Mistral-7B-Instruct-v0.3-q4f32_1-MLC', name: 'Mistral-7B-Instruct-v0.3' },
    { model: 'DeepSeek-R1-Distill-Llama-8B-q4f32_1-MLC', name: 'DeepSeek-R1-Distill-Llama-8B' },
  ];

  vision_models: LLMModel[] = [
    { model: '', name: ''},
    { model: 'Phi-3.5-vision-instruct-q4f32_1-MLC', name: 'Phi-3.5-vision-instruct' },
  ];

  code_models: LLMModel[] = [
    { model: '', name: ''},
    { model: 'Qwen2.5-Coder-1.5B-Instruct-q4f32_1-MLC', name: 'Qwen2.5-Coder-1.5B-Instruct' },
    { model: 'Qwen2.5-Coder-3B-Instruct-q4f32_1-MLC', name: 'Qwen2.5-Coder-3B-Instruct' },
  ];
  
  #progress = signal(0);
  #progressText = signal({ value: '' });

  ready = computed(() => this.#progress() === 1);
  engineError = signal('');

  appConfigService = inject(AppConfigService);

  #isLoading = inject(APP_STATE_TOKEN).isLoading;

  createProgressResource(injector: Injector) {
    const res = resource({
      stream: async () => this.#progressText,
      injector,
    });
    return res.asReadonly();
  }

  async #loadEngine(model: string) {
    try {
      if (!model) {
        return undefined;
      }

      const engineConfig: MLCEngineConfig = { 
        appConfig: this.appConfigService.appConfig,
        initProgressCallback: (report: InitProgressReport) => { 
          this.#progress.set(report.progress);
          this.#progressText.set({ value: report.text });
        }
      }

      return await CreateMLCEngine(model, engineConfig)
    } catch (e) {
      console.error("Failed to load MLC engine", e);
      if (e instanceof Error) {
        this.engineError.set(e.message);
      } else {
        this.engineError.set(`Failed to load MLC engine: ${model}`);
      }
      return undefined;
    }
  }

  createEngine(selectedModel: WritableSignal<LLMModel>, injector: Injector) {
    return toObservable(selectedModel, { injector })
      .pipe(
        tap(() => {
          this.engineError.set('');
          this.#isLoading.set(true);
        }),
        switchMap(async ({ model }) => this.#loadEngine(model)),
        tap((engine) => {
          console.log('Loaded engine', engine);
          this.#isLoading.set(false);
        }),
      );
  }
}
