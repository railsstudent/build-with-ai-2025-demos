import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { CandidateService } from '../services/candidate.service';
import { APP_STATE_TOKEN } from '../../../app-state/app-state.constant';

@Component({
  selector: 'app-cv-content',
  imports: [FormsModule],
  template: `
    <label for="cv">CV:&nbsp;&nbsp;</label>
    <textarea name="cv" id="cv" [(ngModel)]="editableCv" [disabled]="isLoading()">
    </textarea>
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
  isLoading = inject(APP_STATE_TOKEN).isLoading;
  
  #cv = toSignal(this.service.candidateCv$, { initialValue: '' });
  editableCv = signal(this.#cv());  
}
