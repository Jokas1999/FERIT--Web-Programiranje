import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Exercise } from '../shared/exercise.model';
import { ExerciseListService } from './exercise-list.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css'],
})
export class ExerciseListComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  private igChangeSub: Subscription;

  constructor(private slService: ExerciseListService) {}

  ngOnInit(): void {
    this.exercises = this.slService.getIngrediends();
    this.igChangeSub = this.slService.exercisesChanged.subscribe(
      (exercises: Exercise[]) => {
        this.exercises = exercises;
      }
    );
  }

  // onExerciseAdded(exercise : Exercise){
  //   this.exercises.push(exercise);
  // }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}
