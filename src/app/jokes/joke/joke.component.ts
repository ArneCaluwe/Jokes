import { Component } from '@angular/core';
import { merge, Observable, Subject, timer } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { JokeService } from '../services/joke.service';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss'],
})
export class JokeComponent {
  jokeTrigger$ = new Observable<void | number>();
  joke$: Observable<string>;

  manualProceed$ = new Subject<void>();
  pause: boolean = false;

  constructor(private jokeService: JokeService) {
    this.joke$ = merge(
      this.getPausableTimeFunction$(),
      this.manualProceed$
    ).pipe(
      switchMap(() => this.getFormattedJoke$()),
      shareReplay(1)
    );
  }

  private getPausableTimeFunction$(): Observable<number> {
    return timer(0, 5000).pipe(filter((_) => this.pause === false));
  }

  private getFormattedJoke$(): Observable<string> {
    return this.jokeService.getJoke$().pipe(map((resp) => resp.joke));
  }

  onContinue() {
    this.manualProceed$.next();
  }

  onToggleAutomaticRefresh() {
    this.pause = !this.pause;
  }
}
