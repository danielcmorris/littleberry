import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Book } from '../models/book.model';
import { Account } from '../models/account.model';
import { Subject } from '../models/subject.model';
import { Author } from '../models/author.model';
import { BookRequest } from '../models/request.model';
import { NavigationPermissions } from '../models/navigation-permissions.model';

@Injectable({ providedIn: 'root' })
export class LibraryService {
  private server = environment.apiServer;
  readonly imageServer = environment.imageServer;
  readonly defaultBookImage = environment.defaultBookImage;

  constructor(private http: HttpClient) {}

  private getSessionId(): string | null {
    try {
      const account = JSON.parse(localStorage.getItem('account') || '');
      return account.SessionId;
    } catch {
      return null;
    }
  }

  private get sid(): string {
    return this.getSessionId() || '';
  }

  // ─── Book / Catalog ───────────────────────────

  getBook(prefix: string, bookNumber: number): Observable<Book> {
    return this.http.get<Book>(`${this.server}/api/library/catalog/${prefix}/${bookNumber}`);
  }

  getBookHistory(prefix: string, bookNumber: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.server}/library/catalog/${prefix}/${bookNumber}/history`);
  }

  saveBook(book: Book): Observable<any> {
    const url = `${this.server}/api/catalog?sid=${this.sid}`;
    if (book.BookId > 0) {
      return this.http.put(url, book);
    }
    return this.http.post(url, book);
  }

  search(subject: string, author: string, title: string): Observable<Book[]> {
    return this.http.get<Book[]>(
      `${this.server}/api/library/search?prefix=${subject}&author=${author}&title=${title}`
    );
  }

  recent(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.server}/api/library/search`);
  }

  uploadImage(fd: FormData): Observable<string> {
    return this.http.post(`${this.server}/api/image/`, fd, {
      responseType: 'text',
    });
  }

  // ─── Subjects ─────────────────────────────────

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.server}/api/subject`);
  }

  saveSubject(subject: Subject): Observable<any> {
    const url = `${this.server}/api/subject?${this.sid}`;
    if (subject.SubjectId > 0) {
      return this.http.put(url, subject);
    }
    return this.http.post(url, subject);
  }

  // ─── Authors ──────────────────────────────────

  getAuthorsByBookCount(bookCount: number): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.server}/api/author?bookCount=${bookCount}`);
  }

  // ─── Accounts ─────────────────────────────────

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.server}/library/account?sid=${this.sid}`);
  }

  getAccount(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.server}/library/account/${id}?sid=${this.sid}`);
  }

  saveAccount(account: any): Observable<any> {
    const url = `${this.server}/library/account?sid=${this.sid}`;
    if (account.AccountId > 0) {
      return this.http.put(url, account);
    }
    return this.http.post(url, account);
  }

  updateAccountPassword(id: number, password: string): Observable<any> {
    const obj = { AccountId: id, NewPassword: password };
    return this.http.put(`${this.server}/library/account?sid=${this.sid}`, obj);
  }

  lookupAccount(searchType: string, q: string): Observable<any> {
    return this.http.get(`${this.server}/library/accounts/search/email?q=${q}&sid=${this.sid}`);
  }

  // ─── Requests ─────────────────────────────────

  addRequest(callNumber: string, email: string): Observable<any> {
    const obj = { CallNumber: callNumber, RequestByEmail: email };
    return this.http.post(`${this.server}/library/request?sid=${this.sid}`, obj);
  }

  getOpenRequests(): Observable<BookRequest[]> {
    return this.http.get<BookRequest[]>(`${this.server}/library/request?sid=${this.sid}`);
  }

  getRequest(id: number): Observable<any> {
    return this.http.get(`${this.server}/library/request/${id}?sid=${this.sid}`);
  }

  updateRequest(obj: any): Observable<any> {
    return this.http.put(`${this.server}/library/request?sid=${this.sid}`, obj);
  }

  // ─── Auth ─────────────────────────────────────

  login(email: string, password: string): Observable<Account> {
    return this.http.post<Account>(`${this.server}/api/Account/`, { email, password });
  }

  autoLogin(account: any): Observable<Account> {
    return this.http.post<Account>(`${this.server}/api/autologin`, account);
  }

  // ─── Permissions ──────────────────────────────

  updatePermissions(): NavigationPermissions {
    const stored = localStorage.getItem('account');
    if (stored) {
      const a = JSON.parse(stored);
      return new NavigationPermissions(a.AccountType);
    }
    return new NavigationPermissions('');
  }

  getBookImageUrl(book: Book): string {
    if (!book.Url) {
      return `${this.imageServer}/${this.defaultBookImage}`;
    }
    return `${this.imageServer}/${book.Url}`;
  }
}
