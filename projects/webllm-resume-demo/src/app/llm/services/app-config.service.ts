import { Injectable, signal } from '@angular/core';
import { prebuiltAppConfig } from '@mlc-ai/web-llm';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  #config = prebuiltAppConfig;
  modelList = signal(this.#config.model_list.map((m) => ({
      id: m.model_id,
      url: m.model,
    })
  ));
}
