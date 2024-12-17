import { Component } from "@angular/core";



// template:"<h1> good {{calc()}}  {{title}}</h1>  <app-observable></app-observable><app-student-list></app-student-list> ",
@Component({
  selector: 'my-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  x: number = 5;

  title: string = "Hiii";

  calculatedValue: string;

  calc() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    if (currentHour >= 12 && currentHour < 18) {
      return 'Afternoon';
    } else if (currentHour >= 18) {
      return 'Evening';
    } else {

      return 'Morning';
    }

  }

  constructor() {
    this.calculatedValue = this.calc()
  }
}