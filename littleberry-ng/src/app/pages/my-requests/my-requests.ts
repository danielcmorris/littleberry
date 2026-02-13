import { Component, OnInit } from '@angular/core';
import { BreadcrumbsComponent, BreadcrumbLink } from '../../layout/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-my-requests',
  imports: [BreadcrumbsComponent],
  template: `
    <div class="max-w-[900px] mx-auto px-6">
      <app-breadcrumbs [links]="links"></app-breadcrumbs>
      <h2 class="font-semibold text-text-main m-0 mb-6">My Requests</h2>
      <div class="card p-8 text-center">
        <p class="text-text-secondary m-0">Your book request history will appear here.</p>
      </div>
    </div>
  `,
})
export class MyRequestsComponent implements OnInit {
  links: BreadcrumbLink[] = [
    { url: '/', text: 'home' },
    { url: '', text: 'my requests' },
  ];

  ngOnInit(): void {}
}
