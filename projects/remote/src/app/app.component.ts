import { Component, AfterViewInit } from '@angular/core';
import { RecipeService } from './recipe.service';
import { GraphComponent } from './shared/graph.component';

@Component({
  selector: 'app-remote-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [GraphComponent],
})
export class AppComponent implements AfterViewInit {
  barChartData: any;
  barChartOptions: any;
  polarChartData: any;
  polarChartOptions: any;

  constructor(private recipeService: RecipeService) {}

  ngAfterViewInit() {
    this.recipeService.getRecipes().subscribe((data) => {
      const recipes = data.recipes;

      // Prepare data for the bar chart
      this.barChartData = {
        labels: recipes.map((recipe: any) => recipe.name),
        datasets: [
          {
            label: 'Recipe Ratings',
            data: recipes.map((recipe: any) => recipe.rating),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };
      this.barChartOptions = {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

      // Prepare data for the polar area chart
      this.polarChartData = {
        labels: recipes.map((recipe: any) => recipe.cuisine),
        datasets: [
          {
            label: 'Calories Per Serving',
            data: recipes.map((recipe: any) => recipe.caloriesPerServing),
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
      };
      this.polarChartOptions = {
        responsive: true,
      };
    });
  }
}
