import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {SidebarLink} from './sidebar-link';

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

}
