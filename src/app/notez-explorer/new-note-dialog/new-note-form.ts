import {FormControl} from '@angular/forms';

export interface NewNoteForm {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  tags: FormControl<string[] | null>;
}
