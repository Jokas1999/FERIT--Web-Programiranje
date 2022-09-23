import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Workout } from '../../workout.model';
import { WorkoutService } from '../../workout.service';

@Component({
  selector: 'app-workout-item',
  templateUrl: './workout-item.component.html',
  styleUrls: ['./workout-item.component.css'],
})
export class WorkoutItemComponent implements OnInit {
  @Input() workout: Workout;
  @Input() index: number;

  ngOnInit(): void {}
}
