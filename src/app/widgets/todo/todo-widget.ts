// src/app/widgets/todo-widget/todo-widget.ts
import {Component, ElementRef, HostListener, inject, input, output, signal} from '@angular/core';
import { WidgetComponent } from '../widgetComponent';
import { Widget } from '../../notez/core/models/widget';
import { WIDGET_ACCESSOR } from '../widget-token';
import { Observable, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface TodoItem {
  text: string;
  completed: boolean;
}

@Component({
  selector: 'ntz-todo-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-widget.html',
  styleUrl: './todo-widget.scss',
  providers: [
    { provide: WIDGET_ACCESSOR, useExisting: TodoWidget }
  ]
})
export class TodoWidget implements WidgetComponent {
  private elementRef = inject(ElementRef);
  private _hasFocus = false;

  protected todos = signal<TodoItem[]>([]);
  protected newTodoText = signal<string>('');

  public readonly stateChanged = output<void>();
  public readonly metaUpdated = output<any>();
  public readonly widget = input.required<Widget>();

  get hasFocus(): boolean {
    return this._hasFocus;
  }

  @HostListener('window:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    this._hasFocus = this.elementRef.nativeElement.contains(target);
    this.stateChanged.emit();
  }

  addTodo(): void {
    if (this.newTodoText().trim()) {
      const newTodos = [...this.todos(), { text: this.newTodoText(), completed: false }];
      this.todos.set(newTodos);
      this.newTodoText.set('');
      this.updateMeta(newTodos);
    }
  }

  toggleComplete(index: number): void {
    const newTodos = [...this.todos()];
    newTodos[index].completed = !newTodos[index].completed;
    this.todos.set(newTodos);
    this.updateMeta(newTodos);
  }

  removeTodo(index: number): void {
    const newTodos = this.todos().filter((_, i) => i !== index);
    this.todos.set(newTodos);
    this.updateMeta(newTodos);
  }

  private updateMeta(newTodos: TodoItem[]): void {
    this.metaUpdated.emit(newTodos);
  }
}
