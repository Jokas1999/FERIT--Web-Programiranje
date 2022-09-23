import { NumberSymbol } from '@angular/common';

export class Ingredient {
  constructor(
    public name: string,
    public sets: NumberSymbol,
    public reps: NumberSymbol
  ) {}
}
