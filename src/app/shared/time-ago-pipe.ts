import {inject, Pipe, PipeTransform} from '@angular/core';
import {TimeAgo} from './time-ago';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  private readonly timeAgoService = inject(TimeAgo);

  transform(date: Date): unknown {
    return this.timeAgoService.getTimeAgo(date);
  }

}
