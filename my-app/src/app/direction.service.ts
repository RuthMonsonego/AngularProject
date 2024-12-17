import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {
  private directionSubject: BehaviorSubject<string> = new BehaviorSubject<string>('LTR');

  setDirection(direction: string) {
    console.log(`Set direction to: ${direction}`);
    this.directionSubject.next(direction);
  }

  getDirection(): Observable<string> {
    return this.directionSubject.asObservable();
  }
}
