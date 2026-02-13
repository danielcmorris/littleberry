import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibraryService } from '../../services/library.service';
import { Book } from '../../models/book.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit {
  books: Book[] = [];
  imageServer = environment.imageServer;

  constructor(
    private router: Router,
    private libraryService: LibraryService
  ) {}

  ngOnInit(): void {
    this.libraryService.recent().subscribe((data) => {
      this.books = data;
    });
  }

  getBook(book: Book): void {
    this.router.navigate(['/library/catalog/view', book.Prefix, book.BookNumber]);
  }
}
