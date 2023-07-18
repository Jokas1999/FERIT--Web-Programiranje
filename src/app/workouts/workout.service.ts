import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercise } from '../shared/exercise.model';
import { ExerciseListService } from '../exercise-list/exercise-list.service';
import { Workout } from './workout.model';

@Injectable()
export class WorkoutService {
  workoutsChanged = new Subject<Workout[]>();

  constructor(private slService: ExerciseListService) {}

 

  private workouts: Workout[] = [];
  
  setWorkouts(workouts: Workout[]) {
    this.workouts = workouts;
    this.workoutsChanged.next(this.workouts.slice());
  }

  getWorkouts() {
    return this.workouts.slice();
  }

  getWorkout(index: number) {
    return this.workouts[index];
  }

  addExercisesToexerciseList(exercises: Exercise[]) {
    this.slService.addExercises(exercises);
  }

  addWorkout(workout: Workout) {
    this.workouts.push(workout);
    this.workoutsChanged.next(this.workouts.slice());
  }

  updateWorkout(index: number, newWorkout: Workout) {
    this.workouts[index] = newWorkout;
    this.workoutsChanged.next(this.workouts.slice());
  }

  deleteWorkout(index: number) {
    this.workouts.splice(index, 1);
    this.workoutsChanged.next(this.workouts.slice());
  }
}
