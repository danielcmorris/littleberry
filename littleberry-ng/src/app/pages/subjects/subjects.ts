import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LibraryService } from '../../services/library.service';
import { Subject } from '../../models/subject.model';

@Component({
  selector: 'app-subjects',
  imports: [FormsModule],
  templateUrl: './subjects.html',
})
export class SubjectsComponent implements OnInit {
  subjects: Subject[] = [];
  mysubject: Subject = { SubjectId: 0, Name: '', Prefix: '', LastId: 0, Status: 'Active' };
  tmpSubject: Subject | null = null;
  hideList = false;
  sortColumn = 'Name';
  sortAsc = true;

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.libraryService.getSubjects().subscribe((data) => {
      this.subjects = data;
    });
  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortColumn = column;
      this.sortAsc = true;
    }
    this.subjects.sort((a: any, b: any) => {
      const valA = a[column];
      const valB = b[column];
      if (valA < valB) return this.sortAsc ? -1 : 1;
      if (valA > valB) return this.sortAsc ? 1 : -1;
      return 0;
    });
  }

  edit(subject?: Subject): void {
    this.hideList = true;
    if (subject) {
      this.tmpSubject = { ...subject };
      this.mysubject = subject;
    } else {
      this.mysubject = { SubjectId: 0, Name: '', Prefix: '', LastId: 0, Status: 'Active' };
    }
  }

  cancelEdit(): void {
    if (this.tmpSubject && this.mysubject.SubjectId > 0) {
      Object.assign(this.mysubject, this.tmpSubject);
    }
    this.hideList = false;
  }

  save(option: number): void {
    this.tmpSubject = null;
    if (option === 1) {
      this.libraryService.saveSubject(this.mysubject).subscribe(() => {
        this.hideList = false;
      });
    }
    if (option === 2) {
      const newSubject = { ...this.mysubject, SubjectId: 0 };
      this.libraryService.saveSubject(newSubject as Subject).subscribe((resp) => {
        this.subjects.unshift(resp);
        this.hideList = false;
      });
    }
  }
}
