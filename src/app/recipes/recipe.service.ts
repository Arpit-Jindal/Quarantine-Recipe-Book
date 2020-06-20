import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  private defaultRecipes: Recipe[] = [
    new Recipe(
      'Chocolate Cake',
      'Unbelievably soft and spongy, this recipe will satisfy chocolate lovers and cake lovers alike.',
      'https://i2.wp.com/www.vegrecipesofindia.com/wp-content/uploads/2014/12/eggless-chocolate-cake.jpg',
      [
        new Ingredient('Cocoa Powder', 5),
        new Ingredient('Whole Wheat Flour', 5),
        new Ingredient('Baking Soda', 1),
        new Ingredient('Oil', 1),
      ]
    ),
    new Recipe(
      'Aloo Tikki',
      'An Aloo Tikki recipe that is crispy, crusty and so good',
      'https://i2.wp.com/www.vegrecipesofindia.com/wp-content/uploads/2009/08/aloo-tikki.jpg',
      [
        new Ingredient('Potatoes', 5),
        new Ingredient('Gram Flour', 2),
        new Ingredient('Salt', 5),
        new Ingredient('Oil', 2),
      ]
    ),
    new Recipe(
      'Shahi Paneer',
      'Shahi paneer is a delicious and rich creamy dish made with cottage cheese.',
      'https://upload.wikimedia.org/wikipedia/commons/6/6b/Matar_Panir_mit_Chapati_-_Mutter_Paneer_with_chapati.jpg',
      [new Ingredient('Paneer', 5), new Ingredient('Masala', 2)]
    ),
    new Recipe(
      'Hyderabadi Veg Dum Biryani',
      'One of the most royal and grand rice based dish from the Indian cuisine.',
      'https://i2.wp.com/www.vegrecipesofindia.com/wp-content/uploads/2010/07/hyderabadi-vegetable-biryani-recipe.jpg',
      [
        new Ingredient('Rice', 10),
        new Ingredient('Peanuts', 20),
        new Ingredient('Almonds', 5),
        new Ingredient('Oil', 2),
      ]
    ),
    new Recipe(
      'Kadai Mushroom',
      'Kadai mushroom is a super simple, easy and delicious dish',
      'https://i2.wp.com/www.vegrecipesofindia.com/wp-content/uploads/2012/09/kadai-mushroom-recipe-final.jpg',
      [
        new Ingredient('Mushrooms', 10),
        new Ingredient('Coriander', 5),
        new Ingredient('Ginger', 5),
        new Ingredient('Oil', 2),
      ]
    ),
    new Recipe(
      'Scrambled Cottage Cheese',
      'This Paneer Bhurji Recipe is Punjabi Style and way it is made in my home.',
      'https://i2.wp.com/www.vegrecipesofindia.com/wp-content/uploads/2009/08/paneer-bhurji-4.jpg',
      [
        new Ingredient('Paneer', 5),
        new Ingredient('Spices', 10),
        new Ingredient('Ginger Garlic Paste', 1),
        new Ingredient('Onions', 3),
      ]
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  loadDefaultRecipes() {
    this.recipes = this.defaultRecipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    //make deep copy using slice(), thus our original recipes array can't be changed
    return this.recipes.slice();
  }
  addIngredientsToShoppingList(ingArray: Ingredient[]) {
    this.slService.addIngredients(ingArray);
  }

  getRecipebyIndex(idx: number) {
    return this.recipes[idx];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
