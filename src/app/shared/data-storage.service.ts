import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Workout } from '../workouts/workout.model';
import { WorkoutService } from '../workouts/workout.service';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private workoutService: WorkoutService,
    private authService: AuthService
  ) {}

  storeWorkouts() {
    const workouts = this.workoutService.getWorkouts();
    return this.http
      .put(
        'https://ng-course-recipe-book-62567-default-rtdb.firebaseio.com/workouts.json',
        workouts
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  fetchWorkouts() {
    return this.http
      .get<Workout[]>(
        'https://ng-course-recipe-book-62567-default-rtdb.firebaseio.com/workouts.json'
      )
      .pipe(
        map((workouts) => {
          return workouts.map((workout) => {
            return {
              ...workout,
              exercises: workout.exercises ? workout.exercises : [],
            };
          });
        }),
        tap((workouts) => {
          this.workoutService.setWorkouts(workouts);
        })
      );
  }
}
