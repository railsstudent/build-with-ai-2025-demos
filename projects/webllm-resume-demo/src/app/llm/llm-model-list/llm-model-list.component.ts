import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppConfigService } from '../services/app-config.service';

@Component({
  selector: 'app-llm-model-list',
  template: `
    <h2>WebLLM Model List</h2>
    <ol>
      @for (item of modelList(); track item.id) {
        <li>
            <p>
                <label for="id">Id: </label>
                <span id="id" name="id">{{ item.id }}</span>
            </p>
            <p>
                <label for="model">Model: </label>
                <span id="model" name="model">
                    <a [href]="item.url" target="_blank">{{ item.url }}</a>
                </span>
            </p>
        </li>
      }
    </ol>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LlmAppConfigComponent {
  appConfigService = inject(AppConfigService);
  modelList = this.appConfigService.modelList;
}
