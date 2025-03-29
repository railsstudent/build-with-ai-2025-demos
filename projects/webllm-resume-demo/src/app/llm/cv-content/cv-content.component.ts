import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CandidateService } from './services/candidate.service';

@Component({
  selector: 'app-cv-content',
  imports: [FormsModule],
  template: `
    <label for="cv">CV:&nbsp;&nbsp;</label>
    <textarea name="cv" id="cv" [(ngModel)]="cv"></textarea>
  `,
  styles: `
    textarea {
      width: 100%;
      height: 20rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvContentComponent {
  cv = inject(CandidateService).cv;
}
