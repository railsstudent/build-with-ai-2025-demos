import { ChangeDetectionStrategy, Component, inject, Injector, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CandidateService } from '../services/candidate.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cv-content',
  imports: [FormsModule],
  template: `
    <label for="cv">CV:&nbsp;&nbsp;</label>
    <textarea name="cv" id="cv" [(ngModel)]="editableCv"></textarea>
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
  service = inject(CandidateService);
  
  #cv = toSignal(this.service.candidateCv$, { initialValue: '' });
  editableCv = signal(this.#cv());  
}
