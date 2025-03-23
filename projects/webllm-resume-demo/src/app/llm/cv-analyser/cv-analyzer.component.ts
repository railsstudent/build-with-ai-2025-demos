import { ChangeDetectionStrategy, Component, inject, Injector, OnDestroy, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';
import { EngineService } from '../services/engine.service';
import { LlmCacheUsageComponent } from '../llm-cache-usage/llm-cache-usage.component';

@Component({
  selector: 'app-cv-analyser',
  imports: [FormsModule, LlmCacheUsageComponent],
  templateUrl: './cv-analyzer.component.html',
  styles: `
    .error {
      color: red;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CVAnalyzerComponent implements OnDestroy {
  injector = inject(Injector);
  engineService = inject(EngineService);

  models = this.engineService.models;
  selectedModel = signal(this.models()[0]);

  progressResource = this.engineService.createProgressResource(this.injector);
  ready = this.engineService.ready;
  
  error = signal('');

  #engine$ = toObservable(this.selectedModel)
    .pipe(
      switchMap(async (model) => this.engineService.loadEngine(model))
    );
  engine = toSignal(this.#engine$);
      
  ngOnDestroy(): void {
    console.log('Unload engine')
    this.engine()?.unload();
  }
}
