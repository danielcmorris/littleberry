import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LibraryService } from '../../services/library.service';
import { AuthService } from '../../services/auth.service';
import { Book } from '../../models/book.model';
import { NavigationPermissions } from '../../models/navigation-permissions.model';
import { BreadcrumbsComponent, BreadcrumbLink } from '../../layout/breadcrumbs/breadcrumbs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-book-view',
  imports: [BreadcrumbsComponent, DatePipe],
  templateUrl: './book-view.html',
})
export class BookViewComponent implements OnInit {
  book: Book = {} as Book;
  history: any[] = [];
  permission = new NavigationPermissions('');
  bookImage = '';
  links: BreadcrumbLink[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private libraryService: LibraryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.permissions$.subscribe((p) => (this.permission = p));

    this.route.params.subscribe((params) => {
      const prefix = params['prefix'];
      const bookNumber = params['booknumber'];

      this.links = [
        { url: '/', text: 'home' },
        { url: '/library/catalog', text: 'catalog' },
        { url: '', text: prefix + bookNumber },
      ];

      this.libraryService.getBook(prefix, bookNumber).subscribe((book) => {
        this.book = book;
        this.book.CallNumber = this.book.Prefix + this.book.BookNumber;
        this.bookImage = this.libraryService.getBookImageUrl(book);

        this.libraryService.getBookHistory(prefix, bookNumber).subscribe((h) => {
          this.history = h || [];
        });
      });
    });
  }

  edit(): void {
    this.router.navigate(['/library/catalog/edit', this.book.Prefix, this.book.BookNumber]);
  }

  request(): void {
    this.router.navigate(['/library/requests/add', this.book.Prefix, this.book.BookNumber]);
  }

  back(): void {
    this.router.navigate(['/library/catalog']);
  }
}
