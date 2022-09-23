import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutListComponent } from './workouts/workout-list/workout-list.component';
import { WorkoutDetailComponent } from './workouts/workout-detail/workout-detail.component';
import { WorkoutItemComponent } from './workouts/workout-list/workout-item/workout-item.component';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { ExerciseEditComponent } from './exercise-list/exercise-edit/exercise-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './shared/dropdown.directive';
import { ExerciseListService } from './exercise-list/exercise-list.service';
import { AppRoutingModule } from './app-routing.module';
import { WorkoutStartComponent } from './workouts/workout-start/workout-start.component';
import { WorkoutEditComponent } from './workouts/workout-edit/workout-edit.component';
import { WorkoutService } from './workouts/workout.service';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    WorkoutsComponent,
    WorkoutListComponent,
    WorkoutDetailComponent,
    WorkoutItemComponent,
    ExerciseListComponent,
    ExerciseEditComponent,
    DropdownDirective,
    WorkoutStartComponent,
    WorkoutEditComponent,
    AuthComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    ExerciseListService,
    WorkoutService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
