import {booleanAttribute, Component, input, output} from '@angular/core';
import {Icon} from '../../shared/icon';
import {Button} from '../../shared/button';
import {IconButton} from '../../shared/icon-button';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import {WidgetType} from '../core/models/widget';

@Component({
  selector: 'ntz-notez-control',
  imports: [
    Icon,
    Button,
    IconButton,
    CdkMenu,
    CdkMenuTrigger,
    CdkMenuItem
  ],
  templateUrl: './notez-control.html',
  styleUrl: './notez-control.scss',
})
export class NotezControl {
  public readonly create = output<WidgetType>();
  public readonly delete = output<void>();
  public readonly undo = output<void>();
  public readonly redo = output<void>();
  public readonly canUndo = input(true, {transform: booleanAttribute});
  public readonly canRedo = input(true, {transform: booleanAttribute});

  protected creatableWidgetTypes: {
    key: WidgetType;
    label: string;
    icon: string;
  } [] = [
    {key: "debug", label: "debug", icon: "pest_control"},
    {key: "image", label: "image", icon: "image"},
    {key: "todo", label: "todo", icon: "list"},
    {key: "simple-text", label: "simple text", icon: "notes"}
  ] ;

  protected createWidget(type: { key: WidgetType; icon: string }) {
    this.create.emit(type.key);
  }

  protected emitUndo(): void {
    this.undo.emit();
  }

  protected emitRedo(): void {
    this.redo.emit();
  }

  protected emitDelete(): void {
    this.delete.emit();
  }

}
