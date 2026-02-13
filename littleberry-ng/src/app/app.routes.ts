import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'member/join',
    loadComponent: () =>
      import('./pages/account-editor/account-editor').then((m) => m.AccountEditorComponent),
    data: { mode: 'join' },
  },
  {
    path: 'member/requests',
    loadComponent: () =>
      import('./pages/my-requests/my-requests').then((m) => m.MyRequestsComponent),
  },
  {
    path: 'library/catalog',
    loadComponent: () => import('./pages/catalog/catalog').then((m) => m.CatalogComponent),
    data: { mode: 'full' },
  },
  {
    path: 'library/recent',
    loadComponent: () => import('./pages/catalog/catalog').then((m) => m.CatalogComponent),
    data: { mode: 'recent' },
  },
  {
    path: 'library/subject/:prefix',
    loadComponent: () => import('./pages/catalog/catalog').then((m) => m.CatalogComponent),
    data: { mode: 'subject' },
  },
  {
    path: 'library/author',
    loadComponent: () => import('./pages/authors/authors').then((m) => m.AuthorListComponent),
  },
  {
    path: 'library/author/:author',
    loadComponent: () => import('./pages/catalog/catalog').then((m) => m.CatalogComponent),
    data: { mode: 'author' },
  },
  {
    path: 'library/catalog/add',
    loadComponent: () =>
      import('./pages/book-editor/book-editor').then((m) => m.BookEditorComponent),
    canActivate: [authGuard],
  },
  {
    path: 'library/catalog/view/:prefix/:booknumber',
    loadComponent: () =>
      import('./pages/book-view/book-view').then((m) => m.BookViewComponent),
  },
  {
    path: 'library/catalog/:mode/:prefix/:booknumber',
    loadComponent: () =>
      import('./pages/book-editor/book-editor').then((m) => m.BookEditorComponent),
  },
  {
    path: 'library/requests',
    loadComponent: () =>
      import('./pages/requests/requests').then((m) => m.RequestsComponent),
  },
  {
    path: 'library/requests/:mode/:prefix/:booknumber',
    loadComponent: () =>
      import('./pages/requests/requests').then((m) => m.RequestsComponent),
  },
  {
    path: 'library/subjects',
    loadComponent: () =>
      import('./pages/subjects/subjects').then((m) => m.SubjectsComponent),
    canActivate: [authGuard],
  },
  {
    path: 'library/accounts',
    loadComponent: () =>
      import('./pages/accounts/accounts').then((m) => m.AccountListComponent),
    canActivate: [authGuard],
  },
  {
    path: 'library/accounts/add',
    loadComponent: () =>
      import('./pages/account-editor/account-editor').then((m) => m.AccountEditorComponent),
    canActivate: [authGuard],
    data: { mode: 'add' },
  },
  {
    path: 'library/accounts/:id',
    loadComponent: () =>
      import('./pages/account-editor/account-editor').then((m) => m.AccountEditorComponent),
    canActivate: [authGuard],
    data: { mode: 'edit' },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
