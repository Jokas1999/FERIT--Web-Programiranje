import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShopingListService } from './shoping-list.service';

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css']
})
export class ShopingListComponent implements OnInit,OnDestroy {

  ingredients : Ingredient[];
  private igChangeSub : Subscription


  constructor(private slService : ShopingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngrediends();
    this.igChangeSub = this.slService.ingredientsChanged
    .subscribe(
      (ingredients :Ingredient[]) =>{
      this.ingredients = ingredients;
    } );
  }

  // onIngredientAdded(ingredient : Ingredient){
  //   this.ingredients.push(ingredient);
  // }

  onEditItem(index : number){
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}
