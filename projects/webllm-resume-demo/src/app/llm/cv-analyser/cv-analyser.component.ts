import { ChangeDetectionStrategy, Component, computed, OnDestroy, resource, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { InitProgressReport } from '@mlc-ai/web-llm';
import { createMLCEngine } from '../create-llm-engine';

@Component({
  selector: 'app-cv-analyser',
  imports: [],
  templateUrl: './resume-analyser.component.html',
  styles: `
    :host {
      display: block;
    }

    .error {
      color: red;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CVAnalyserComponent implements OnDestroy {
  // model = signal('gemma-2-2b-it-q4f32_1-MLC');
  model = signal('Llama-3.2-3B-Instruct-q4f32_1-MLC');

  #progress = signal(0);
  #progressInPercent = computed(() => {
    const percent = (this.#progress() * 100).toFixed(2);
    return { value: `${percent}%` };
  });
  #res = resource({
    stream: async () => this.#progressInPercent,
  });
  progressResource = this.#res.asReadonly();
  ready = computed(() => this.#progress() === 1);

  #initProgressCallback(report: InitProgressReport) {
    this.#progress.set(report.progress);
  }
  
  error = signal('');

  constructor() {
    toObservable(this.model)
      .subscribe(async (model) => { 
        try {
          await createMLCEngine(model, 
            { 
              initProgressCallback: this.#initProgressCallback.bind(this)
            });
        } catch (e) {
          console.error('Failed to create engine', e);
          if (e instanceof Error) {
            this.error.set(e.message);
          } else {
            this.error.set(`Failed to load model: ${this.model()}`)
          }
        }
      });
  }
  
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
