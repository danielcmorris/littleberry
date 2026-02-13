import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BreadcrumbLink {
  url: string;
  text: string;
}

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink],
  template: `
    <ul class="flex flex-wrap list-none p-4 px-6 mb-6 mt-0 bg-transparent border-b border-border text-[13px] font-medium tracking-wide uppercase">
      @for (bc of links; track bc.text; let last = $last) {
        @if (!$first) {
          <li class="px-2 text-text-muted">&rsaquo;</li>
        }
        <li>
          @if (bc.url) {
            <a [routerLink]="bc.url" class="text-text-muted hover:text-primary transition-colors">{{ bc.text }}</a>
          } @else {
            <span class="text-primary">{{ bc.text }}</span>
          }
        </li>
      }
    </ul>
  `,
})
export class BreadcrumbsComponent {
  @Input() links: BreadcrumbLink[] = [];
}
