import {Component, input} from '@angular/core';

@Component({
  selector: 'ntz-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public readonly header = input.required<string>();

}
