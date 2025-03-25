import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatCompletionMessageParam, MLCEngine } from '@mlc-ai/web-llm';
import { APP_STATE_TOKEN } from '../../app-state/app-state.constant';

@Component({
  selector: 'app-llm-response',
  imports: [FormsModule],
  template: `
    <h3>Ask a question</h3>
    <div>
      <label for="systemPrompt">System Prompt:&nbsp;&nbsp;</label>
      <span id="systemPrompt" name="systemPrompt">{{ systemPrompt() }}</span>
    </div>
    <div>
      <label for="query">Query:&nbsp;&nbsp;</label>
      <textarea id="query" name="query" [(ngModel)]="query" [disabled]="isLoading()"></textarea>
    </div>
    @let text = isLoading() ? 'Generating...' : 'Ask';
    <button (click)="generateAnswer()" [disabled]="isLoading()">{{ text }}</button>
    
  `,
  styles: `
    textarea {
      width: 100%;
      height: 100px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LlmResponseComponent {
  engine = input.required<MLCEngine | undefined>();
  systemPrompt = input.required<string>();
  query = signal('Please write a function to add two numbers and return the result. Please do not use any built-in function.');
  
  messages = computed<ChatCompletionMessageParam[]>(() => ([
    { role: "system", content: this.systemPrompt() },
    { role: "user", content: this.query() },
  ]));

  isLoading = inject(APP_STATE_TOKEN).isLoading;

  async generateAnswer() {
    try {
      this.isLoading.set(true);

      if (!this.engine()) {
        console.log('Need to reload engine');
        return;
      }

      const engine = this.engine() as MLCEngine;
      await engine.resetChat();

      const chunks = await engine.chat.completions.create({
        messages: this.messages(),
        stream: true, // <-- Enable streaming
      });
      
      if (!chunks) {
        return;
      }

      for await (const chunk of chunks) {
        console.log('chunk', chunk.choices[0]?.delta?.content);
        // if (chunk.usage) {
        //   console.log(chunk.usage); // only last chunk has usage
        // }
      }
    } finally {
      this.isLoading.set(false);
    }
  }
}
