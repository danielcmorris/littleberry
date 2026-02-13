import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LibraryService } from '../../services/library.service';
import { NavigationPermissions } from '../../models/navigation-permissions.model';
import { Subject } from '../../models/subject.model';
import { Author } from '../../models/author.model';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, FormsModule],
  templateUrl: './navbar.html',
})
export class NavbarComponent implements OnInit, OnDestroy {
  callnumber = '';
  username = '';
  subjects: Subject[] = [];
  authors: Author[] = [];
  permission = new NavigationPermissions('');
  navOpen = false;
  openDropdown: string | null = null;
  darkMode = false;

  private mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  private mediaListener = (e: MediaQueryListEvent) => {
    if (localStorage.getItem('theme') === null) {
      this.darkMode = e.matches;
      this.applyTheme();
    }
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private libraryService: LibraryService
  ) {}

  ngOnInit(): void {
    this.initTheme();
    this.loadSubjects();
    this.loadAuthors();

    this.authService.permissions$.subscribe((perms) => {
      this.permission = perms;
    });

    const account = this.authService.getAccount();
    if (account) {
      this.username = account.Email;
    }

    this.mediaQuery.addEventListener('change', this.mediaListener);
  }

  ngOnDestroy(): void {
    this.mediaQuery.removeEventListener('change', this.mediaListener);
  }

  initTheme(): void {
    const stored = localStorage.getItem('theme');
    if (stored) {
      this.darkMode = stored === 'dark';
    } else {
      this.darkMode = this.mediaQuery.matches;
    }
    this.applyTheme();
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme(): void {
    document.documentElement.classList.toggle('dark', this.darkMode);
  }

  private loadSubjects(): void {
    this.libraryService.getSubjects().subscribe((data) => {
      this.subjects = data.filter((s) => s.Status === 'Active');
    });
  }

  private loadAuthors(): void {
    this.libraryService.getAuthorsByBookCount(30).subscribe((data) => {
      this.authors = data;
    });
  }

  toggleDropdown(name: string): void {
    this.openDropdown = this.openDropdown === name ? null : name;
  }

  closeDropdowns(): void {
    this.openDropdown = null;
  }

  openByCallNumberKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.openByCallNumber();
    }
  }

  openByCallNumber(): void {
    const cn = this.callnumber;
    const bookNumber = cn.replace(/\D/g, '');
    const prefix = cn.replace(/[0-9]/g, '');
    this.libraryService.getBook(prefix, parseInt(bookNumber, 10)).subscribe((book) => {
      if (book.CallNumber) {
        if (book.Status === 'Deleted') {
          alert('This title was deleted.');
        } else {
          this.router.navigate(['/library/catalog/view', prefix, bookNumber]);
        }
      } else {
        alert('No title found for call number ' + cn);
      }
    });
    this.callnumber = '';
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authService.logout();
    this.username = '';
    this.closeDropdowns();
  }
}
