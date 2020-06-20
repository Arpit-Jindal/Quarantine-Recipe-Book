import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Subscription } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class DataStorageService implements OnDestroy {
  user: User;
  private sub: Subscription;
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService,
    private authService: AuthService
  ) {
    this.sub = this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }
  ngOnInit() {}
  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http
      .put(
        'https://recipebook-b184f.firebaseio.com/users/' +
          this.user.email.replace('.', '') +
          '.json',
        recipes
      )
      .subscribe();
  }
  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://recipebook-b184f.firebaseio.com/users/' +
          this.user.email.replace('.', '') +
          '.json'
      )
      .pipe(
        map((recipes) => {
          if (!recipes) return [];
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipesService.setRecipes(recipes);
        })
      );
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
