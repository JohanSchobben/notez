import {Component, inject} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {SidebarLink} from './sidebar-link';
import {NotezDialog} from '../../shared/dialog-component/notez-dialog.service';
import {NewNoteDialog} from '../../notez-explorer/new-note-dialog/new-note-dialog';

@Component({
  selector: 'ntz-sidebar',
  imports: [
    NgOptimizedImage,
    SidebarLink
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private readonly dialog = inject(NotezDialog);

  openNewNoteDialog() {
    this.dialog.open(NewNoteDialog);
  }
}
