import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-app-nav',
  imports: [RouterLinkActive, RouterLink],
  template: `
    <div class="links">
      @for (link of links(); track link.name) {
        <a [routerLinkActive]="['active']" [routerLink]="link.link">{{ link.name}}</a>
      }
    </div>
  `,
  styles: `
    .links {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }
    .active {
      font-weight: bold;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppNavComponent {
  links = signal([
    {
      name: 'CV Analyzer',
      link: '/cv-analyzer',
    }, 
    {
      name: 'Coder Q&A',
      link: '/coder-qa',
    }, 
    {
      name: 'Math Q&A',
      link: '/math-qa',
    }, 
    {
      name: 'Web LLM Model List',
      link: '/llm-model-list'
    }
  ]);
}
