import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Workout } from '../workout.model';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.css'],
})
export class WorkoutDetailComponent implements OnInit {
  workout: Workout;
  id: number;

  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];

      this.workout = this.workoutService.getWorkout(this.id);
    });
  }

  OnAddToShoppingList() {
    this.workoutService.addIngredientsToShoppingList(this.workout.ingredients);
  }

  onEditWorkout() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onDeleteWorkout() {
    this.workoutService.deleteWorkout(this.id);
    this.router.navigate(['/workouts']);
  }
}
