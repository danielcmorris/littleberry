import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { LibraryService } from '../../services/library.service';
import { AuthService } from '../../services/auth.service';
import { Account } from '../../models/account.model';
import { Book } from '../../models/book.model';
import { BookRequest } from '../../models/request.model';
import { NavigationPermissions } from '../../models/navigation-permissions.model';
import { BreadcrumbsComponent, BreadcrumbLink } from '../../layout/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-requests',
  imports: [FormsModule, DatePipe, BreadcrumbsComponent, RouterLink],
  templateUrl: './requests.html',
})
export class RequestsComponent implements OnInit {
  requests: BookRequest[] = [];
  mode = '';
  callNumber = '';
  prefix = '';
  bookNumber = '';
  book: Book = {} as Book;
  account: Account = {} as Account;
  email = '';
  permission = new NavigationPermissions('');
  showAddress = false;
  showConfirm = false;
  showSearch = false;
  showList = false;
  links: BreadcrumbLink[] = [];
  filterEmail = '';
  filterCallNumber = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private libraryService: LibraryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.permissions$.subscribe((p) => (this.permission = p));

    this.route.params.subscribe((params) => {
      this.mode = params['mode'] || '';
      this.prefix = params['prefix'] || '';
      this.bookNumber = params['booknumber'] || '';
      this.callNumber = this.prefix + this.bookNumber;

      const storedAccount = this.authService.getAccount();
      if (storedAccount) this.account = storedAccount;

      if (this.mode === 'add' || this.mode === 'edit') {
        this.loadBook();
        this.email = this.account.Email;
        this.lookupAccount(this.email);
        this.links = [
          { url: '/', text: 'home' },
          { url: '/library/catalog', text: 'catalog' },
          { url: `/library/catalog/view/${this.prefix}/${this.bookNumber}`, text: this.callNumber },
          { url: '', text: 'request ' + this.callNumber },
        ];
      } else {
        this.getRequests();
        this.showList = true;
        this.links = [
          { url: '/', text: 'home' },
          { url: '', text: 'requests' },
        ];
      }
    });
  }

  private loadBook(): void {
    if (this.prefix && this.bookNumber) {
      this.libraryService.getBook(this.prefix, parseInt(this.bookNumber, 10)).subscribe((book) => {
        this.book = book;
      });
    }
  }

  lookupAccount(email: string): void {
    const stored = this.authService.getAccount();
    if (stored && stored.Email === email) {
      this.account = stored;
      this.showAddress = true;
      this.showSearch = false;
      return;
    }

    this.libraryService.lookupAccount('email', email).subscribe((resp) => {
      if (resp && resp !== 'No Accounts Found') {
        this.account = Array.isArray(resp) ? resp[0] : resp;
        this.showAddress = true;
        this.showSearch = false;
      } else {
        if (confirm('No account was found for ' + email + '. Would you like to make a new account for them?')) {
          this.account = { Email: email } as Account;
          this.showAddress = true;
          this.showSearch = false;
        }
      }
    });
  }

  addRequestByAccount(): void {
    this.libraryService.saveAccount(this.account).subscribe(() => {
      this.libraryService.addRequest(this.callNumber, this.account.Email).subscribe((resp) => {
        if (!resp.BookId) {
          alert(resp);
        } else {
          this.showConfirm = true;
          this.showAddress = false;
          this.getRequests();
        }
      });
    });
  }

  getRequests(): void {
    if (this.authService.isAuthenticated()) {
      this.libraryService.getOpenRequests().subscribe((data) => {
        this.requests = data;
      });
    }
  }

  updateRequest(type: string, res: BookRequest, status: boolean, date?: string): void {
    const obj: any = {
      ReservationSubId: res.ReservationSubId,
      ChangeType: type,
      OnOff: status,
      ChangeDate: date || new Date().toISOString(),
    };
    this.libraryService.updateRequest(obj).subscribe(() => {
      this.getRequests();
    });
  }

  setDate(type: string, res: BookRequest, event: Event): void {
    const input = event.target as HTMLInputElement;
    this.updateRequest(type, res, true, input.value);
  }

  clearDate(type: string, res: BookRequest): void {
    this.updateRequest(type, res, false);
  }

  get filteredRequests(): BookRequest[] {
    let list = this.requests;
    if (this.filterEmail) {
      const term = this.filterEmail.toLowerCase();
      list = list.filter((r) => r.RequestByEmail?.toLowerCase().includes(term));
    }
    if (this.filterCallNumber) {
      const term = this.filterCallNumber.toLowerCase();
      list = list.filter((r) => (r.Prefix + r.BookNumber).toLowerCase().includes(term));
    }
    return list;
  }

  goToCatalog(): void {
    this.router.navigate(['/library/catalog']);
  }
}
