import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LibraryService } from '../../services/library.service';
import { AuthService } from '../../services/auth.service';
import { Book } from '../../models/book.model';
import { Subject } from '../../models/subject.model';
import { NavigationPermissions } from '../../models/navigation-permissions.model';
import { BreadcrumbsComponent, BreadcrumbLink } from '../../layout/breadcrumbs/breadcrumbs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-book-editor',
  imports: [FormsModule, BreadcrumbsComponent, DatePipe],
  templateUrl: './book-editor.html',
})
export class BookEditorComponent implements OnInit {
  mode = 'insert';
  book: Book = {
    BookId: 0, Title: '', Author: '', Prefix: '', BookNumber: 0,
    CallNumber: '', Subject: 'Azores', SubjectId: 0, Status: 'Active',
    Url: '', Notes: '', Barcode: '', Description: '', Edition: '',
    ISBN: '', Media: '', PubDate: '', Publisher: '', PubLocation: '',
  };
  subjects: Subject[] = [];
  bookImage = '';
  file: File | null = null;
  uploading = false;
  loading = false;
  editing = true;
  history: any[] = [];
  permissions = new NavigationPermissions('');
  links: BreadcrumbLink[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private libraryService: LibraryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.permissions$.subscribe((p) => (this.permissions = p));
    this.loadSubjects();

    this.route.params.subscribe((params) => {
      const viewmode = params['mode'] || 'add';
      const prefix = params['prefix'];
      const booknumber = params['booknumber'];

      this.links = [
        { url: '/', text: 'home' },
        { url: '/library/catalog', text: 'catalog' },
        { url: '', text: prefix && booknumber ? prefix + booknumber : 'new' },
      ];

      if (prefix && booknumber && viewmode !== 'add') {
        this.editing = viewmode === 'edit';
        this.mode = 'update';
        this.loadBook(prefix, booknumber);
      } else {
        this.mode = 'insert';
        this.editing = true;
      }
    });
  }

  private loadSubjects(): void {
    this.libraryService.getSubjects().subscribe((data) => {
      this.subjects = data;
      this.updateSubjectDisplay();
    });
  }

  private loadBook(prefix: string, booknumber: string): void {
    this.loading = true;
    this.libraryService.getBook(prefix, parseInt(booknumber, 10)).subscribe((book) => {
      this.book = book;
      this.book.CallNumber = book.Prefix + book.BookNumber;
      this.bookImage = this.libraryService.getBookImageUrl(book);
      this.updateSubjectDisplay();

      this.libraryService.getBookHistory(prefix, parseInt(booknumber, 10)).subscribe((h) => {
        this.history = h || [];
      });
      this.loading = false;
    });
  }

  private updateSubjectDisplay(): void {
    for (const s of this.subjects) {
      if (s.SubjectId == this.book.SubjectId) {
        this.book.Subject = s.Name;
      }
    }
  }

  applySubject(): void {
    for (const s of this.subjects) {
      if (s.SubjectId == this.book.SubjectId) {
        this.book.Prefix = s.Prefix;
        this.book.BookNumber = s.LastId + 1;
        this.book.CallNumber = this.book.Prefix + this.book.BookNumber;
        break;
      }
    }
    this.clearBookImage();
  }

  clearBookImage(): void {
    this.bookImage = '';
    this.book.Url = '';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    }
  }

  uploadImage(): void {
    if (!this.file) return;
    this.uploading = true;
    const fd = new FormData();
    fd.append('file', this.file);
    fd.append('callnumber', this.book.CallNumber);
    this.libraryService.uploadImage(fd).subscribe((url) => {
      this.bookImage = this.libraryService.imageServer + '/' + url;
      this.uploading = false;
    });
  }

  saveBook(option: number): void {
    this.loading = true;
    if (this.file) {
      this.uploadImage();
    }
    this.libraryService.saveBook(this.book).subscribe(() => {
      if (this.book.Status === 'Deleted' || option === 1) {
        this.router.navigate(['/library/recent']);
        return;
      }
      if (option === 2) {
        this.book = {
          BookId: 0, Title: '', Author: '', Prefix: '', BookNumber: 0,
          CallNumber: '', Subject: 'Azores', SubjectId: 0, Status: 'Active',
          Url: '', Notes: '', Barcode: '', Description: '', Edition: '',
          ISBN: '', Media: '', PubDate: '', Publisher: '', PubLocation: '',
        };
        this.bookImage = '';
        this.file = null;
        this.router.navigate(['/library/catalog/add']);
      }
      this.loading = false;
    });
  }

  deleteBook(): void {
    if (confirm('Are you sure?')) {
      this.book.Status = 'Deleted';
      this.saveBook(1);
    }
  }

  go(path: string): void {
    this.router.navigate(['/library/' + path]);
  }
}
