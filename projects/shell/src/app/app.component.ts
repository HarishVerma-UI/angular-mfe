import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'shell-app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'shell';
  randomNotification: string = '';

  ngOnInit() {
    this.generateRandomNotification();
  }

  generateRandomNotification() {
    const notifications = [
      'Welcome to the dashboard!',
      'You have new messages.',
      'Check out the latest updates.',
      'Your profile has been updated.',
      'New analytics data available.',
    ];
    this.randomNotification =
      notifications[Math.floor(Math.random() * notifications.length)];
  }

  showNotification() {
    alert(this.randomNotification);
  }
}
