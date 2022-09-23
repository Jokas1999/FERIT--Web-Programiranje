import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutEditComponent } from './workouts/workout-edit/workout-edit.component';
import { WorkoutDetailComponent } from './workouts/workout-detail/workout-detail.component';
import { WorkoutStartComponent } from './workouts/workout-start/workout-start.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { WorkoutsResolverService } from './workouts/workouts-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/workouts', pathMatch: 'full' },

  {
    path: 'workouts',
    component: WorkoutsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: WorkoutStartComponent },
      { path: 'new', component: WorkoutEditComponent },
      {
        path: ':id',
        component: WorkoutDetailComponent,
        resolve: [WorkoutsResolverService],
      },
      {
        path: ':id/edit',
        component: WorkoutEditComponent,
        resolve: [WorkoutsResolverService],
      },
    ],
  },
  { path: 'exercise-list', component: ExerciseListComponent },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
