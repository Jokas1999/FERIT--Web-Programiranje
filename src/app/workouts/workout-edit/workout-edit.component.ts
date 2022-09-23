import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-workout-added',
  templateUrl: './workout-edit.component.html',
  styleUrls: ['./workout-added.component.css'],
})
export class WorkoutEditComponent implements OnInit {
  id: number;
  editMode = false;
  workoutForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];

      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.workoutForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../']), { relativeto: this.route };
  }

  onSubmit() {
    // const newWorkout = new Workout(
    //   this.workoutForm.value['name'],
    //   this.workoutForm.value['description'],
    //   this.workoutForm.value['imagePath'],
    //   this.workoutForm.value['ingredients'] )
    if (this.editMode) {
      this.workoutService.updateWorkout(this.id, this.workoutForm.value);
    } else {
      this.workoutService.addWorkout(this.workoutForm.value);
    }
    this.onCancel();
  }
  onAddIngredient() {
    (<FormArray>this.workoutForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        sets: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
        reps: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  private initForm() {
    let workoutName = '';
    let workoutImagePath = '';
    let workoutDescription = '';
    let workoutIngredients = new FormArray([]);

    if (this.editMode) {
      const workout = this.workoutService.getWorkout(this.id);
      workoutName = workout.name;
      workoutImagePath = workout.imagePath;
      workoutDescription = workout.description;
      if (workout['ingredients']) {
        for (let ingredient of workout.ingredients) {
          workoutIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              sets: new FormControl(ingredient.sets, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
              reps: new FormControl(ingredient.reps, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }
    this.workoutForm = new FormGroup({
      name: new FormControl(workoutName, Validators.required),
      imagePath: new FormControl(workoutImagePath, Validators.required),
      description: new FormControl(workoutDescription, Validators.required),
      ingredients: workoutIngredients,
    });
  }

  get controls() {
    // a getter!
    return (<FormArray>this.workoutForm.get('ingredients')).controls;
  }
}
