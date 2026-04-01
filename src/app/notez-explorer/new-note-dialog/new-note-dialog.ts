import {Component, DestroyRef, inject} from '@angular/core';
import {DialogHeader} from '../../shared/dialog-component/dialog-header';
import {DialogBody} from '../../shared/dialog-component/dialog-body';
import {Label} from '../../shared/form-field/label/label';
import {Input} from '../../shared/form-field/input';
import {TagInput} from '../../shared/tag-input/tag-input';
import {createNote, storeNoteSuccess} from '../core/notez-explorer.actions';
import {Button} from '../../shared/button';
import {DialogActions} from '../../shared/dialog-component/dialog-actions';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NewNoteForm} from './new-note-form';
import {DialogRef} from '@angular/cdk/dialog';
import {Store} from '@ngrx/store';
import {Actions, ofType} from '@ngrx/effects';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {take} from 'rxjs';

@Component({
  selector: 'ntz-new-note-dialog',
  imports: [
    DialogHeader,
    DialogBody,
    Label,
    Input,
    TagInput,
    Button,
    DialogActions,
    ReactiveFormsModule
  ],
  templateUrl: './new-note-dialog.html',
  styleUrl: './new-note-dialog.scss',
})
export class NewNoteDialog {
  private destroyRef = inject(DestroyRef);
  private dialogRef = inject(DialogRef);
  private store = inject(Store);
  private actions = inject(Actions);
  protected NoteForm = new FormGroup<NewNoteForm>({
    name: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(50)]),
    description: new FormControl<string | null>(null, [Validators.maxLength(2000)]),
    tags: new FormControl<string[] | null>(null, [Validators.maxLength(10)])
  });

  protected closeDialog() {
    this.dialogRef.close();
  }

  protected createNote(): void {
    this.actions
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        ofType(storeNoteSuccess),
        take(1)
      ).subscribe(() => {
        this.dialogRef.close();
    });
    if (this.NoteForm.invalid) return;
    this.store.dispatch(createNote({
      title: this.NoteForm.value.name!,
      description: this.NoteForm.value.description ?? undefined,
      tags: this.NoteForm.value.tags ?? undefined
    }));
  }
}
