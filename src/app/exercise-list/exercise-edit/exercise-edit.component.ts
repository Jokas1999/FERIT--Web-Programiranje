import { Component, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Exercise } from 'src/app/shared/exercise.model';
import { ExerciseListService } from '../exercise-list.service';

@Component({
  selector: 'app-exercise-edit',
  templateUrl: './exercise-edit.component.html',
  styleUrls: ['./exercise-edit.component.css'],
})
export class ExerciseEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Exercise;
  constructor(private slService: ExerciseListService) {}

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getExercise(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          sets: this.editedItem.sets,
          reps: this.editedItem.reps,
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newExercise = new Exercise(value.name, value.sets, value.reps);
    if (this.editMode) {
      this.slService.updateExercise(this.editedItemIndex, newExercise);
    } else {
      this.slService.addExercise(newExercise);
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteExercise(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
