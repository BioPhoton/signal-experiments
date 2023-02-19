import {Injectable} from "@angular/core";
import {delay, of} from "rxjs";

export type CounterState = { count: number, isTicking: boolean, countUp: boolean, countDiff: number, tickSpeed: number }

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  getInitialCount: CounterState = {
    count: 0,
    countUp: true,
    isTicking: false,
    countDiff: 1,
    tickSpeed: 1000
  };
  getInitialCount$ = of(this.getInitialCount).pipe(
    delay(2000)
  );
}
