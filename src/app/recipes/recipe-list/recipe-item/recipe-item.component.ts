import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() index: number;
  //can also fetch recipe by recipeService getRecipeByIndex()
  @Input() recipe: Recipe;
  constructor() {}
  ngOnInit(): void {}
}
