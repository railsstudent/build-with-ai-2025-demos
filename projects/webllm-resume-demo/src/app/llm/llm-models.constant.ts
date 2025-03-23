import { InjectionToken } from '@angular/core';
import { LLMModel } from './types/llm-model.type';

export const LLM_MODEL_LIST = new InjectionToken<LLMModel[]>('LLM_MODEL_LIST');
