import { ChangeDetectionStrategy, Component, computed, contentChild, ElementRef, inject, input, model, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatCompletionMessageParam, MLCEngine } from '@mlc-ai/web-llm';
import DOMPurify from 'dompurify';
import * as smd from "streaming-markdown";
import { APP_STATE_TOKEN } from '../../app-state/app-state.constant';
import { CvContentComponent } from '../cv-qa/components/cv-content.component';

@Component({
  selector: 'app-llm-response',
  imports: [FormsModule],
  templateUrl: './llm-response.component.html',
  styleUrl: './llm-response.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LlmResponseComponent {
  engine = input.required<MLCEngine | undefined>();
  systemPrompt = input.required<string>();
  query = model('');
  
  isLoading = inject(APP_STATE_TOKEN).isLoading;

  candidateCV = contentChild(CvContentComponent);
  answer = viewChild.required<ElementRef<HTMLDivElement>>('answer');
  
  systemPromptWithContext = computed(() => {
    const context = this.candidateCV()?.editableCv() || '';
    if (context) {
      return `${this.systemPrompt()}
      
The following is the context:

${context}
    `;
    }
    return this.systemPrompt();
  })
  
  messages = computed<ChatCompletionMessageParam[]>(() => ([
    { role: "system", content: this.systemPromptWithContext() },
    { role: "user", content: this.query() },
  ]));

  async generateAnswer() {
    try {
      this.isLoading.set(true);

      if (!this.engine()) {
        console.log('Need to reload engine');
        return;
      }

      const engine = this.engine() as MLCEngine;
      await engine.resetChat();
      await this.#writeChunk(engine);
    } finally {
      this.isLoading.set(false);
    }
  }

  async #writeChunk(engine: MLCEngine) {
    const answerElement = this.answer().nativeElement;
    while (answerElement.lastChild) {
      answerElement.removeChild(answerElement.lastChild as ChildNode);
    } 
    
    const renderer = smd.default_renderer(answerElement);
    const parser = smd.parser(renderer);

    const chunks = await engine.chat.completions.create({
      messages: this.messages(),
      stream: true, // <-- Enable streaming
    });
    
    if (!chunks) {
      return;
    }

    let reply = '';
    for await (const chunk of chunks) {
      const chunkContent = chunk.choices[0]?.delta?.content || '';
      reply = reply + chunkContent;

      DOMPurify.sanitize(reply);
      // Check if the output was insecure.
      if (DOMPurify.removed.length) {
        smd.parser_end(parser);
        console.log('parser_end called');
        return;
      }

      smd.parser_write(parser, chunkContent);
    }
  }
}
