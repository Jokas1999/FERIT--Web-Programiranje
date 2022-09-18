import {Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShopingListService } from '../shoping-list/shoping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();


  constructor(private slService : ShopingListService) { }


  // private recipes : Recipe[] = [
  //   new Recipe('hamburger','smrdi','https://d17zv3ray5yxvp.cloudfront.net/variants/7YnS5o8P9mMqndQuBHrFqrdm/57ed05bea98bceae5f0eaada26b69cee6c61471d3030f7123d212844a35eba04'
  //   ,[
  //     new Ingredient('meat',1),
  //     new Ingredient('ranch',1)
  //   ]),
  //   new Recipe('cheesburger','smrdi','https://d17zv3ray5yxvp.cloudfront.net/variants/7YnS5o8P9mMqndQuBHrFqrdm/57ed05bea98bceae5f0eaada26b69cee6c61471d3030f7123d212844a35eba04'
  //   ,[
  //     new Ingredient('Salat',1),
  //     new Ingredient('meat',2)
  //   ])
  // ];

  private recipes: Recipe[] = [];
  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  
  getRecipes(){
    return this.recipes.slice();
  }


  getRecipe(index: number){
    
    return this.recipes[index];
  }


   addIngredientsToShoppingList(ingredients:Ingredient[]){
    this.slService.addIngredients(ingredients);

   }

   addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice())
   }

   updateRecipe(index:number,newRecipe:Recipe){
    this.recipes[index]=newRecipe;
    this.recipesChanged.next(this.recipes.slice())

   }

  deleteRecipe(index: number){
      this.recipes.splice(index,1);
      this.recipesChanged.next(this.recipes.slice())
  }
}
