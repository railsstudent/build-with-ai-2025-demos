import { ChangeDetectionStrategy, Component, inject, Injector, OnDestroy, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { EngineService } from '../services/engine.service';

@Component({
  selector: 'app-cv-analyser',
  imports: [],
  templateUrl: './cv-analyzer.component.html',
  styles: `
    .error {
      color: red;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CVAnalyserComponent implements OnDestroy {
  // model = signal('gemma-2-2b-it-q4f32_1-MLC');
  model = signal('Llama-3.2-3B-Instruct-q4f32_1-MLC');

  injector = inject(Injector);
  engineService = inject(EngineService);
  progressResource = this.engineService.createProgressResource(this.injector);
  ready = this.engineService.ready;
  
  error = signal('');

  #engine$ = toObservable(this.model)
    .pipe(
      switchMap(async (model) => this.engineService.loadEngine(model))
    );
  engine = toSignal(this.#engine$);
      
  ngOnDestroy(): void {
    console.log('Unload engine')
    this.engine()?.unload();
  }
}
