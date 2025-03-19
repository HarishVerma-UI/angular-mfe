import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';
import Chart from 'chart.js/auto';
import { GraphComponent } from './shared/graph.component';

@Component({
  selector: 'app-remote-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [GraphComponent],
})
export class AppComponent implements OnInit {
  recipes: any[] = [];
  sortedRecipes: any[] = [];
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.getRecipes().subscribe((data) => {
      this.recipes = data.recipes;
      this.sortedRecipes = [...this.recipes];

      // Prepare data for the bar chart
      const labels = this.sortedRecipes.map((recipe: any) => recipe.name);
      const ratings = this.sortedRecipes.map((recipe: any) => recipe.rating);

      // Create the bar chart using Chart.js
      const barCtx = (
        document.getElementById('recipe-chart') as HTMLCanvasElement
      ).getContext('2d');
      if (barCtx) {
        new Chart(barCtx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Recipe Ratings',
                data: ratings,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }

      // Prepare data for the polar area chart
      const polarLabels = this.sortedRecipes.map(
        (recipe: any) => recipe.cuisine
      );
      const polarData = this.sortedRecipes.map(
        (recipe: any) => recipe.caloriesPerServing
      );

      // Create the polar area chart using Chart.js
      const polarCtx = (
        document.getElementById('polar-chart') as HTMLCanvasElement
      ).getContext('2d');
      if (polarCtx) {
        new Chart(polarCtx, {
          type: 'polarArea',
          data: {
            labels: polarLabels,
            datasets: [
              {
                label: 'Calories Per Serving',
                data: polarData,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
          },
        });
      }
    });
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      // Toggle sort direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Set new column and default to ascending
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.sortedRecipes.sort((a: any, b: any) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
}
