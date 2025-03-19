import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'data-table-root',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  countriesData: any[] = [];
  filteredCountries: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  filterText!: string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCountriesData();
  }

  fetchCountriesData() {
    const query = `query MyQuery {
      countries {
        awsRegion
        capital
        code
        currency
        name
        currencies
        native
        phone
        emoji
        states {
          name
        }
      }
    }`;

    this.http
      .post('https://countries.trevorblades.com/graphql', { query })
      .subscribe((response: any) => {
        this.countriesData = response.data.countries;
        this.applyFilterAndPagination();
      });
  }

  applyFilterAndPagination() {
    const filtered = this.countriesData.filter((country) =>
      country.name.toLowerCase().includes(this.filterText.toLowerCase())
    );

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredCountries = filtered.slice(startIndex, endIndex);
  }

  onFilterChange() {
    this.currentPage = 1; // Reset to the first page when filter changes
    this.applyFilterAndPagination();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.applyFilterAndPagination();
  }

  get totalPages(): number {
    return Math.ceil(
      this.countriesData.filter((country) =>
        country.name.toLowerCase().includes(this.filterText.toLowerCase())
      ).length / this.itemsPerPage
    );
  }
}
