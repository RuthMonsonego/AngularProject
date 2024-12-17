import { Component } from '@angular/core';
import { DirectionService } from '../direction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private directionService: DirectionService) {}

  setDirection(direction: string) {
    this.directionService.setDirection(direction);
  }
}
