import { makeEnvironmentProviders } from '@angular/core';
import { prebuiltAppConfig } from '@mlc-ai/web-llm';
import { WEB_LLM_CACHE_CONFIG } from './cache-uage.constant';

export function provideCacheUsageConfig(config: { useIndexDB: boolean }) {
    return makeEnvironmentProviders([
        {
            provide: WEB_LLM_CACHE_CONFIG,
            useFactory: () =>  { 
                prebuiltAppConfig.useIndexedDBCache = config.useIndexDB;
                return prebuiltAppConfig
            }
        }
    ]);
}