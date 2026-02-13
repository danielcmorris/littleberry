import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../models/account.model';
import { NavigationPermissions } from '../models/navigation-permissions.model';
import { LibraryService } from './library.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private permissionsSubject = new BehaviorSubject<NavigationPermissions>(
    new NavigationPermissions('')
  );
  permissions$ = this.permissionsSubject.asObservable();

  constructor(
    private router: Router,
    private libraryService: LibraryService
  ) {
    this.refreshPermissions();
  }

  login(email: string, password: string): Observable<Account> {
    return this.libraryService.login(email, password).pipe(
      tap((account) => {
        localStorage.setItem('account', JSON.stringify(account));
        this.refreshPermissions();
      })
    );
  }

  logout(): void {
    localStorage.removeItem('account');
    this.permissionsSubject.next(new NavigationPermissions(''));
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return !!this.getAccount();
  }

  getSessionId(): string | null {
    const account = this.getAccount();
    return account?.SessionId || null;
  }

  getAccount(): Account | null {
    try {
      const stored = localStorage.getItem('account');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    return null;
  }

  getPermissions(): NavigationPermissions {
    return this.permissionsSubject.value;
  }

  refreshPermissions(): void {
    const account = this.getAccount();
    if (account) {
      const perms = new NavigationPermissions(account.AccountType);
      perms.LoggedIn = true;
      perms.AddRequest = true;
      this.permissionsSubject.next(perms);
    } else {
      this.permissionsSubject.next(new NavigationPermissions(''));
    }
  }
}
