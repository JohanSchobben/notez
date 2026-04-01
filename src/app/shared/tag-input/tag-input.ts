import { Component, signal } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Label} from '../form-field/label/label';
import {Input} from '../form-field/input';
import {CdkDrag, CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import {Tag} from '../tag/tag';

@Component({
  selector: 'ntz-tag-input',
  imports: [
    Label,
    Input,
    CdkDropList,
    Tag,
    CdkDrag
  ],
  templateUrl: './tag-input.html',
  styleUrl: './tag-input.scss',
  providers: [
    {provide: NG_VALUE_ACCESSOR, multi: true, useExisting: TagInput}
  ]
})
export class TagInput implements ControlValueAccessor {
  private static counter = 0;
  private changeFn: ((value: string[] | null) => void) | undefined;
  private touchedFn: (() => void) | undefined;
  protected value= signal<string[] | null>(null);
  protected disabled = signal(false);
  protected id = `tag-input-${TagInput.counter++}`;

  public writeValue(obj: string[]): void {
    this.value.set(obj);
  }
  public registerOnChange(fn: any): void {
    this.changeFn = fn;
  }
  public registerOnTouched(fn: any): void {
    this.touchedFn = fn;
  }
  public setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected addTag(event: Event) {
    const target = event.target as HTMLInputElement;
    event.preventDefault();
    if (!target.value) return;
    if (this.value()?.includes(target.value)) return;
    this.value.update(v => {
      if(!v) return [target.value];
      return [...v, target.value]
    });
    this.changeFn?.(this.value());
    target.value = '';
  }

  protected changeOrder(event: CdkDragDrop<any, any>) {
    this.value.update(v => {
      if(!v) return null;
      const [removed] = v.splice(event.previousIndex, 1);
      v.splice(event.currentIndex, 0, removed);
      return v;
    });
    this.changeFn?.(this.value());
    this.touchedFn?.();
  }

  protected emitTouched() :void {
    this.touchedFn?.();
  }

  protected removeTag(tag: string) {
    this.value.update(v => {
      if(!v) return null;
      return v.filter(t => t !== tag);
    });
    this.changeFn?.(this.value());
  }
}
