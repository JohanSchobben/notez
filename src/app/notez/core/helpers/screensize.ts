import {fromEvent, map, startWith, throttleTime} from 'rxjs';

export const windowResize$  = fromEvent(window, 'resize')
  .pipe(
    throttleTime(300),
    map(() => ({width: window.innerWidth, height: window.innerHeight})),
    startWith({ width: window.innerWidth, height: window.innerHeight})
  );
