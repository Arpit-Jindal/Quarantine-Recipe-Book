import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  private sub: Subscription;
  constructor(
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub = this.recipeService.recipesChanged.subscribe(
      (newRecipes: Recipe[]) => {
        this.recipes = newRecipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  onLoadSampleRecipes() {
    this.recipeService.loadDefaultRecipes();
    this.dataStorageService.storeRecipes();
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe;
  }
}
