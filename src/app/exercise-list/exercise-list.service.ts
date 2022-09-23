import { EventEmitter, Injectable } from '@angular/core';
import { Exercise } from '../shared/exercise.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExerciseListService {
  exercisesChanged = new Subject<Exercise[]>();
  private exercises: Exercise[] = [];
  startedEditing = new Subject<number>();

  getIngrediends() {
    return this.exercises.slice();
  }

  getExercise(index: number) {
    return this.exercises[index];
  }

  addExercise(exercise: Exercise) {
    this.exercises.push(exercise);
    this.exercisesChanged.next(this.exercises.slice());
  }
  addExercises(exercises: Exercise[]) {
    // for(let exercise of exercises){
    //   exercises.push(exercise);
    // }
    this.exercises.push(...exercises);
    this.exercisesChanged.next(this.exercises.slice());
  }
  updateExercise(index: number, newExercise: Exercise) {
    this.exercises[index] = newExercise;
    this.exercisesChanged.next(this.exercises.slice());
  }

  deleteExercise(index: number) {
    this.exercises.splice(index, 1);
    this.exercisesChanged.next(this.exercises.slice());
  }

  constructor() {}
}
