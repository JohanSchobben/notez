import { Injectable } from '@angular/core';

type TimeIndicator = { value: number, unit: Intl.RelativeTimeFormatUnit };

@Injectable({
  providedIn: 'root',
})
export class TimeAgo {
  private readonly formatter: Intl.RelativeTimeFormat = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });


  private getIndicator(secondsAgo: number): TimeIndicator {
    const times: TimeIndicator[] = [
      { value: 60, unit: 'second' },
      { value: 60*60, unit: 'minute' },
      { value: 24*60*60, unit: 'hour' },
      { value: 7*24*60*60, unit: 'day' },
      { value: 14*24*60*60, unit: 'week' },
      { value: 30*24*60*60, unit: 'month' },
      { value: 365*24*60*60, unit: 'year' },
    ];
    return times.find(time => secondsAgo < time.value) || { value: 365*24*60*60, unit: 'year' };
  }

  public getTimeAgo(date: Date): string {
    const offset = Math.floor((Date.now() - date.getTime()) / 1000);
    const indicator = this.getIndicator(Math.abs(offset));
    const value = Math.max(Math.round(offset / indicator.value), 1) * -1;
    return this.formatter.format(value, indicator.unit);
  }
}
