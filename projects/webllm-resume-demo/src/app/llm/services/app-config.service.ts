import { inject, Injectable, signal } from '@angular/core';
import { WEB_LLM_CACHE_CONFIG } from '../llm-cache-usage/cache-uage.constant';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  appConfig = inject(WEB_LLM_CACHE_CONFIG);

  modelList = signal(this.appConfig.model_list.map((m) => ({
      id: m.model_id,
      url: m.model,
    })
  ));
}
