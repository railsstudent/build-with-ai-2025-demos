import { computed, Injectable, Injector, resource, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CreateMLCEngine, InitProgressReport, MLCEngineConfig } from '@mlc-ai/web-llm';
import { switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EngineService {
  models = signal([
    { model: 'gemma-2-2b-it-q4f32_1-MLC', name: 'gemma-2-2b-it' },
    { model: 'gemma-2-9b-it-q4f32_1-MLC', name: 'gemma-2-9b-it'},
    { model: 'Llama-3.2-3B-Instruct-q4f32_1-MLC', name: 'Llama-3.2-3B-Instruct' },
    { model: 'Phi-3.5-mini-instruct-q4f32_1-MLC', name: 'Phi-3.5-mini-instruct' },
    { model: 'Mistral-7B-Instruct-v0.3-q4f32_1-MLC', name: 'Mistral-7B-Instruct-v0.3' },
    { model: 'SmolLM2-1.7B-Instruct-q4f32_1-MLC', name: 'SmolLM2-1.7B-Instruct'},
    { model: 'DeepSeek-R1-Distill-Llama-8B-q4f32_1-MLC', name: 'DeepSeek-R1-Distill-Llama-8B' },
  ]).asReadonly();

  selectedModel = signal(this.models()[0]);
  
  #progress = signal(0);
  #progressText = signal({ value: '' });

  ready = computed(() => this.#progress() === 1);
  engineError = signal('');

  createProgressResource(injector: Injector) {
    const res = resource({
      stream: async () => this.#progressText,
      injector,
    });
    return res.asReadonly();
  }

  async #loadEngine(model: string) {
    try {
      const engineConfig: MLCEngineConfig = { 
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

  createEngineSignal(injector: Injector) {
    const engine$ = toObservable(this.selectedModel, { injector })
      .pipe(
        tap(() => this.engineError.set('')),
        switchMap(async ({ model }) => this.#loadEngine(model)),
        tap((engine) => console.log('Loaded engine', engine))
      );
    return toSignal(engine$, { injector });
  }
}
