import { Exercise } from '../shared/exercise.model';

export class Workout {
  public name: string;
  public description: string;
  public imagePath: string;
  public exercises: Exercise[];

  constructor(
    name: string,
    description: string,
    imagePath: string,
    exercises: Exercise[]
  ) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.exercises = exercises;
  }
}
