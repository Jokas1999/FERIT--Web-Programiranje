import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Workout } from '../workout.model';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
})
export class WorkoutListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  workouts: Workout[];

  constructor(
    private workoutService: WorkoutService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.workouts = this.workoutService.getWorkouts();
    this.subscription = this.workoutService.workoutsChanged.subscribe(
      (workouts: Workout[]) => {
        this.workouts = workouts;
      }
    );
  }

  onNewWorkout() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
