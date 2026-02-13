import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LibraryService } from '../../services/library.service';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-accounts',
  imports: [FormsModule],
  templateUrl: './accounts.html',
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];
  searchText = '';

  constructor(
    private router: Router,
    private libraryService: LibraryService
  ) {}

  ngOnInit(): void {
    this.libraryService.getAccounts().subscribe((data) => {
      this.accounts = data;
    });
  }

  get filteredAccounts(): Account[] {
    let list = this.accounts.filter((a) => a.Status === 'Active');
    if (this.searchText) {
      const term = this.searchText.toLowerCase();
      list = list.filter(
        (a) =>
          a.FirstName?.toLowerCase().includes(term) ||
          a.LastName?.toLowerCase().includes(term) ||
          a.Email?.toLowerCase().includes(term)
      );
    }
    return list;
  }

  editAccount(account: Account): void {
    this.router.navigate(['/library/accounts', account.AccountId]);
  }

  addAccount(): void {
    this.router.navigate(['/library/accounts/add']);
  }
}
