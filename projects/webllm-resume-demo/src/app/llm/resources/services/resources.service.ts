import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  #pages = signal([
    {
      title: 'WebLLM Home',
      url: 'https://webllm.mlc.ai/docs'
    },
    {
      title: 'MLC Complete Model List',
      url: 'https://mlc.ai/models'
    },
    {
      title: 'WebLLM Model List',
      url: 'https://github.com/mlc-ai/web-llm/blob/main/src/config.ts#L311'
    },
    {
      title: 'WebLLM Examples',
      url: 'https://github.com/mlc-ai/web-llm/tree/main/examples'
    },
    {
      title: 'Best practices to render streamed LLM responses',
      url: 'https://developer.chrome.com/docs/ai/render-llm-responses'
    }
  ]);

  resources = this.#pages.asReadonly();
}
