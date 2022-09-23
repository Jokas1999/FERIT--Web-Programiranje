import { NumberSymbol } from '@angular/common';

export class Exercise {
  constructor(
    public name: string,
    public sets: NumberSymbol,
    public reps: NumberSymbol
  ) {}
}
