import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Workout } from './workout.model';
import { WorkoutService } from './workout.service';

@Injectable({ providedIn: 'root' })
export class WorkoutsResolverService implements Resolve<Workout[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private workoutService: WorkoutService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const workouts = this.workoutService.getWorkouts();

    if (workouts.length === 0) {
      return this.dataStorageService.fetchWorkouts();
    } else {
      return workouts;
    }
  }
}
