import { InjectionToken } from '@angular/core';
import { LLMModel } from './types/llm-model.type';

export const LLM_MODEL_LIST = new InjectionToken<LLMModel[]>('LLM_MODEL_LIST');

const models: LLMModel[] = [
    { model: '', name: ''},
    { model: 'gemma-2-2b-it-q4f32_1-MLC', name: 'gemma-2-2b-it' },
    { model: 'gemma-2-9b-it-q4f32_1-MLC', name: 'gemma-2-9b-it'},
    { model: 'Llama-3.2-3B-Instruct-q4f32_1-MLC', name: 'Llama-3.2-3B-Instruct' },
    { model: 'Mistral-7B-Instruct-v0.3-q4f32_1-MLC', name: 'Mistral-7B-Instruct-v0.3' },
  ];

const math_models: LLMModel[] = [
    { model: '', name: ''},
    { model: 'Qwen2-Math-7B-Instruct-q4f32_1-MLC', name: 'Qwen2-Math-7B-Instruct'},
    { model: 'Qwen2.5-Math-1.5B-Instruct-q4f32_1-MLC', name: 'Qwen2.5-Math-1.5B-Instruct' },
    { model: 'WizardMath-7B-V1.1-q4f16_1-MLC', name: 'WizardMath-7B-V1.1-q4f16_1-MLC'},    
  ];

const coder_models: LLMModel[] = [
    { model: '', name: ''},
    { model: 'Qwen2.5-Coder-1.5B-Instruct-q4f32_1-MLC', name: 'Qwen2.5-Coder-1.5B-Instruct' },
    { model: 'Qwen2.5-Coder-3B-Instruct-q4f32_1-MLC', name: 'Qwen2.5-Coder-3B-Instruct' },
    { model: 'Qwen2.5-Coder-7B-Instruct-q4f32_1-MLC', name: 'Qwen2.5-Coder-7B-Instruct' }
  ];

export const MODEL_LIST_PROVIDER = {
    provide: LLM_MODEL_LIST,
    useValue: models
};

export const MATH_MODEL_LIST_PROVIDER = {
    provide: LLM_MODEL_LIST,
    useValue: math_models
};

export const CODER_MODEL_LIST_PROVIDER = {
    provide: LLM_MODEL_LIST,
    useValue: coder_models
};
