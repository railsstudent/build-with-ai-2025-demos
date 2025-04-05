import { LLMModel } from './llm-model.type';

export type LLMUsage = { 
    progress: number;
    selectedModel: LLMModel;
    deletedModel: string; 
}
