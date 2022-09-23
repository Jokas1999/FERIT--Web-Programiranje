import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShopingListService } from '../shoping-list/shoping-list.service';
import { Workout } from './workout.model';

@Injectable()
export class WorkoutService {
  workoutsChanged = new Subject<Workout[]>();

  constructor(private slService: ShopingListService) {}

  // private workouts : Workout[] = [
  //   new Workout('hamburger','smrdi','https://d17zv3ray5yxvp.cloudfront.net/variants/7YnS5o8P9mMqndQuBHrFqrdm/57ed05bea98bceae5f0eaada26b69cee6c61471d3030f7123d212844a35eba04'
  //   ,[
  //     new Ingredient('meat',1),
  //     new Ingredient('ranch',1)
  //   ]),
  //   new Workout('cheesburger','smrdi','https://d17zv3ray5yxvp.cloudfront.net/variants/7YnS5o8P9mMqndQuBHrFqrdm/57ed05bea98bceae5f0eaada26b69cee6c61471d3030f7123d212844a35eba04'
  //   ,[
  //     new Ingredient('Salat',1),
  //     new Ingredient('meat',2)
  //   ])
  // ];

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

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
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
