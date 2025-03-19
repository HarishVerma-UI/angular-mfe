# AngularMfe

This project is a micro-frontend application built using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.7 and Webpack Module Federation. It allows you to create scalable, modular applications by splitting them into smaller, independently deployable micro-frontends.

---

## Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

---

## Module Federation

This project uses Webpack Module Federation to enable micro-frontend architecture. Module Federation allows multiple applications to share code and dependencies at runtime, making it easier to build modular and scalable applications.

### Key Features:
- **Host Application**: The `shell` application acts as the host.
- **Remote Applications**: Other micro-frontends can be integrated as remote modules.
- **Shared Dependencies**: Common libraries (e.g., Angular, RxJS) are shared between the host and remote applications to reduce duplication.

To configure Module Federation, the `webpack.config.js` file is used. For example:
```javascript
plugins: [
  new ModuleFederationPlugin({
    name: 'shell',
    remotes: {
      remoteApp: 'remoteApp@http://localhost:4201/remoteEntry.js',
    },
    shared: {
      '@angular/core': { singleton: true, strictVersion: true },
      '@angular/common': { singleton: true, strictVersion: true },
    },
  }),
],
```

---

## Code Scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

---

## Building

To build the project, run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

---

## Running Unit Tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

---

## Running End-to-End Tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

---

## NPM Packages Used

### Core Angular Packages:
- `@angular/core`: Core Angular framework.
- `@angular/router`: For routing and navigation.

### Webpack and Module Federation:
- `webpack`: For bundling the application.
- `@angular-architects/module-federation`: Simplifies the setup of Module Federation in Angular projects.

### Charting Library:
If you are using charts in your project, the following libraries are recommended:
- `chart.js`: A popular JavaScript charting library.
- `ng2-charts`: Angular wrapper for Chart.js.

To install Chart.js and ng2-charts:
```bash
npm install chart.js ng2-charts
```

Example usage in a component:
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-chart',
  template: `<canvas baseChart [data]="chartData" [type]="'bar'"></canvas>`,
})
export class ChartComponent {
  chartData = {
    labels: ['January', 'February', 'March'],
    datasets: [
      {
        label: 'Sales',
        data: [10, 20, 30],
        backgroundColor: ['red', 'blue', 'green'],
      },
    ],
  };
}
```

---

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

For more details on Webpack Module Federation, visit the [Webpack Module Federation Documentation](https://webpack.js.org/concepts/module-federation/).

---