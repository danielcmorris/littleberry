import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LibraryService } from '../../services/library.service';
import { Author } from '../../models/author.model';
import { BreadcrumbsComponent, BreadcrumbLink } from '../../layout/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-authors',
  imports: [FormsModule, BreadcrumbsComponent, RouterLink],
  templateUrl: './authors.html',
})
export class AuthorListComponent implements OnInit {
  authors: Author[] = [];
  filteredList: Author[] = [];
  searchText = '';
  pageTitle = 'Complete Author List';
  loading = false;
  showSearchResults = false;
  links: BreadcrumbLink[] = [
    { url: '/', text: 'home' },
    { url: '', text: 'authors' },
  ];

  constructor(
    private router: Router,
    private libraryService: LibraryService
  ) {}

  ngOnInit(): void {
    this.loadAuthors();
  }

  private loadAuthors(): void {
    this.loading = true;
    this.libraryService.getAuthorsByBookCount(1).subscribe((data) => {
      this.authors = data;
      this.loading = false;
      this.pageTitle = `${this.authors.length} Authors Found`;
    });
  }

  searchKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchAuthors();
    }
  }

  searchAuthors(): void {
    const term = this.searchText.toLowerCase();
    this.filteredList = this.authors.filter((a) =>
      a.Author.toLowerCase().includes(term)
    );
    this.showSearchResults = true;
    this.pageTitle = `${this.filteredList.length} Authors Found`;
  }

  clearSearch(): void {
    this.searchText = '';
    this.showSearchResults = false;
    this.pageTitle = `${this.authors.length} Authors Found`;
  }

  get displayList(): Author[] {
    return this.showSearchResults ? this.filteredList : this.authors;
  }
}
