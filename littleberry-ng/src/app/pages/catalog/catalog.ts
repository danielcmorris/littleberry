import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LibraryService } from '../../services/library.service';
import { Book } from '../../models/book.model';
import { BreadcrumbsComponent, BreadcrumbLink } from '../../layout/breadcrumbs/breadcrumbs';
import { environment } from '../../environments/environment';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-catalog',
  imports: [FormsModule, BreadcrumbsComponent, RouterLink, LowerCasePipe],
  templateUrl: './catalog.html',
})
export class CatalogComponent implements OnInit {
  mode = 'full';
  books: Book[] = [];
  searchText = '';
  pageTitle = 'Catalog';
  searchResults = false;
  links: BreadcrumbLink[] = [];
  imageServer = environment.imageServer;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private libraryService: LibraryService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.mode = data['mode'] || 'full';
    });

    this.route.params.subscribe((params) => {
      const prefix = params['prefix'];
      const author = params['author'];

      if (this.mode === 'recent') {
        this.links = [
          { url: '/', text: 'home' },
          { url: '/library/catalog', text: 'catalog' },
          { url: '', text: 'recent additions' },
        ];
        this.pageTitle = 'Recent Additions';
        this.loadRecent();
      } else if (this.mode === 'subject' && prefix) {
        this.links = [
          { url: '/', text: 'home' },
          { url: '/library/catalog', text: 'catalog' },
          { url: '', text: prefix },
        ];
        this.webSearch('', prefix, '');
      } else if (this.mode === 'author' && author) {
        this.links = [
          { url: '/', text: 'home' },
          { url: '/library/author', text: 'authors' },
          { url: '', text: author },
        ];
        this.webSearch('', '', author);
      } else {
        this.links = [
          { url: '/', text: 'home' },
          { url: '', text: 'catalog' },
        ];
      }
    });
  }

  search(): void {
    this.webSearch(this.searchText, '', '');
  }

  searchKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.search();
    }
  }

  clearSearch(): void {
    this.searchText = '';
  }

  goRecent(): void {
    this.router.navigate(['/library/recent']);
  }

  getBook(book: Book): void {
    this.router.navigate(['/library/catalog/view', book.Prefix, book.BookNumber]);
  }

  private loadRecent(): void {
    this.searchResults = false;
    this.libraryService.recent().subscribe((data) => {
      this.books = data;
      this.searchResults = true;
    });
  }

  private webSearch(terms: string, prefix: string, author: string): void {
    this.searchResults = false;
    this.libraryService.search(prefix, author, terms).subscribe((data) => {
      this.books = data;
      this.searchResults = true;
      const count = this.books.length;
      const countText = count > 1000 ? 'More than 1000' : count.toString();

      if (count > 0) {
        if (this.mode === 'author') {
          this.pageTitle = `${countText} Titles by ${this.route.snapshot.params['author']}`;
        } else if (this.mode === 'subject') {
          this.pageTitle = `${countText} Titles in ${this.books[0].Subject}`;
        } else {
          this.pageTitle = `${countText} Titles found`;
        }
      } else {
        this.pageTitle = `No Titles Found for search text ("${terms}")`;
      }
    });
  }

  badgeClass(status: string): string {
    switch (status) {
      case 'Active': return 'badge-active';
      case 'Inactive': return 'badge-inactive';
      case 'Checked Out': return 'badge-checked-out';
      case 'On Request': return 'badge-on-request';
      default: return 'badge-neutral';
    }
  }
}
