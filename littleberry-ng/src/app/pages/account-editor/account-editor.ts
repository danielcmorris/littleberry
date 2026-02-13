import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LibraryService } from '../../services/library.service';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-account-editor',
  imports: [FormsModule],
  templateUrl: './account-editor.html',
})
export class AccountEditorComponent implements OnInit {
  account: Account = {} as Account;
  mode = 'add';
  showPasswordDialog = false;
  newPassword = '';
  toast = '';

  states = 'AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY'.split(' ');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private libraryService: LibraryService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.mode = data['mode'] || 'add';
    });

    this.route.params.subscribe((params) => {
      const id = params['id'];

      if (this.mode === 'add' || this.mode === 'join') {
        this.account = {
          AccountId: 0, SessionId: '', FirstName: '', LastName: '',
          Phone: '', Email: '', AddressTitle: '', Address1: '', Address2: '',
          City: '', State: '', Zip: '', Country: 'United States',
          FullAddress: '', AccountType: 'Member', Status: 'Active',
          CreateDate: '', ModifiedDate: '', ModifiedBy: '', CreateBy: '',
          Password: 'password', OfficeId: '',
        };
      }

      if (this.mode === 'edit' && id) {
        this.libraryService.getAccount(parseInt(id, 10)).subscribe((data) => {
          this.account = data;
        });
      }
    });
  }

  saveUser(saveType: number): void {
    this.showToast('Saving...');
    this.libraryService.saveAccount(this.account).subscribe((resp) => {
      if (saveType === 0) {
        this.showToast('Saved');
        this.account = resp.data || resp;
        return;
      }
      if (saveType === 4) {
        this.showToast('Saved');
        this.account = resp.data || resp;
        localStorage.setItem('account', JSON.stringify(this.account));
        this.router.navigate(['/']);
        return;
      }
      if (saveType === 1) this.router.navigate(['/library/accounts']);
      if (saveType === 2) this.router.navigate(['/library/accounts/add']);
      if (saveType === 3) this.showPasswordDialog = false;
    });
  }

  deleteAccount(): void {
    const msg = `Are you sure you want to delete ${this.account.FirstName} ${this.account.LastName}'s account?`;
    if (confirm(msg)) {
      this.account.Status = 'Deleted';
      this.saveUser(1);
    }
  }

  updatePassword(): void {
    this.account.Password = this.newPassword;
    this.saveUser(3);
  }

  private showToast(msg: string): void {
    this.toast = msg;
    setTimeout(() => (this.toast = ''), 3000);
  }

  go(url: string): void {
    this.router.navigate([url]);
  }
}
