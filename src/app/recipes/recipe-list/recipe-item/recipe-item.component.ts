import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent {
  //can also fetch recipe by recipeService getRecipeByIndex()
  @Input() index: number;
  @Input() recipe: Recipe;
}
