import { computed, Injectable, Injector, resource, signal, inject } from '@angular/core';
import { InitProgressReport, MLCEngineConfig } from '@mlc-ai/web-llm';
import { createMLCEngine } from '../create-llm-engine';

@Injectable({
  providedIn: 'root'
})
export class EngineService {
  models = signal([
    'gemma-2-2b-it-q4f32_1-MLC',
    'Llama-3.2-3B-Instruct-q4f32_1-MLC',
    'Phi-3.5-mini-instruct-q4f32_1-MLC',
    'Mistral-7B-Instruct-v0.3-q4f32_1-MLC',
    'DeepSeek-R1-Distill-Llama-8B-q4f32_1-MLC',
    'DeepSeek-R1-Distill-Llama-70B-q4f32_1-MLC'
  ]).asReadonly();
  
  #progress = signal(0);
  #progressText = signal({ value: '' });

  ready = computed(() => this.#progress() === 1);

  createProgressResource(injector: Injector) {
    const res = resource({
      stream: async () => this.#progressText,
      injector,
    });
    return res.asReadonly();
  }

  loadEngine(model: string) {
    try {
      const options: MLCEngineConfig = { 
        initProgressCallback: (report: InitProgressReport) => { 
          this.#progress.set(report.progress);
          this.#progressText.set({ value: report.text });
        }
      }
      return createMLCEngine(model, options);
    } catch (e) {
      console.error("Failed to load MLC engine", e);
      return undefined;
    }
  }
}
