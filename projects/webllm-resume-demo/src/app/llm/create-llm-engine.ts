import { CreateMLCEngine, MLCEngine, MLCEngineConfig } from '@mlc-ai/web-llm';

export async function createMLCEngine(llm: string, engineConfig?: MLCEngineConfig): Promise<MLCEngine> {
    return CreateMLCEngine(llm, engineConfig);
}
