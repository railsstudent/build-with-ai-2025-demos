import { InjectionToken } from '@angular/core';
import { AppConfig } from '@mlc-ai/web-llm';

export const WEB_LLM_CACHE_CONFIG = new InjectionToken<AppConfig>('WEB_LLM_CACHE_CONFIG');
