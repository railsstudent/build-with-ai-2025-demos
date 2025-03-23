import { ChangeDetectionStrategy, Component, inject, Injector, signal } from '@angular/core';
import { LlmSelectModelComponent } from '../llm-select-model/llm-select-model.component';
import { EngineService } from '../services/engine.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-llm-cache-usage',
  imports: [LlmSelectModelComponent],
  template: `
    <app-llm-select-model [(selectedModel)]="selectedModel" />
    @if (error()) {
      <label for="error">Error:&nbsp;&nbsp;</label>
      <span class='error' id="error" name="error">{{ error() }}</span>
    } @else {
      @if (progressResource.error()) {
          <p class='error'>Error: {{ progressResource.error() }}</p>
      } @else if (progressResource.hasValue()) {
          <p>Progress: {{ progressResource.value() }}</p>
      } 
      Ready: {{ ready()}}
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LlmCacheUsageComponent {
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
}
