import { Component, OnInit } from '@angular/core';
import { Students } from './Students';
import { ServiceService } from './service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  
  showDangerAlert = false;
  dangerMessage = '';

  showSuccessAlert = false;
  successMessage = '';
  
  public Student : Students[] | undefined;
  public deleteStudent: Students | undefined;
  public updateStudent: Students | undefined;

  constructor(private service :ServiceService ){}

  ngOnInit() {
      this.getStudents();
      this.showDangerAlert = false;
      this.showSuccessAlert = false;
  }

  public getStudents(): void {
    this.service.getStudents().subscribe(
      (response : Students[]) => {
        this.Student = response;
        console.log(this.Student);
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onOpenModal(student: any, mode: string): void {
    const container = document.getElementById('container') ;
    if (container) {
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
  
      if (mode === 'add') {
        button.setAttribute('data-target', '#addEmployeeModal');
      }
      if (mode === 'edit') {
        this.updateStudent = student;
        button.setAttribute('data-target', '#updateEmployeeModal');
      }
      if (mode === 'delete') {
        this.deleteStudent = student;
        console.log(this.deleteStudent);
        button.setAttribute('data-target', '#deleteEmployeeModal');
      }
  
      container.appendChild(button);
      button.click();
    } else {
      console.error("Container element not found");
    }
  }

  onAddStudent(addForm: NgForm) {
    document.getElementById("add-employee-form")?.click();
    this.showSuccessAlert = true;
    this.successMessage = addForm.value.firstname+" "+"saved Successfully!";
    this.service.saveStudents(addForm.value).subscribe(
      (respose: Students) =>{
      console.log(respose);
      this.getStudents();
      },
      (error : HttpErrorResponse) => {
      this.getStudents();
      }
    )
    }

    onUpdateStudent(updatedStudent: any) {
      document.getElementById("edit-employee-form")?.click();
      this.showSuccessAlert = true;
      this.successMessage = this.updateStudent?.firstname + "  " + "updates successfully!";
      this.service.updateStudents(this.updateStudent?.id, updatedStudent).subscribe(
        (response: Students) => {
          console.log(response);
          this.getStudents(); // Refresh the data after successful update
        },
        (error: HttpErrorResponse) => {
          // alert(error.message);
          this.getStudents();
        }
      );
    }

    ondeleteStudent(id : any) {
      this.showDangerAlert = true;
      this.dangerMessage = "Data deleted successfully!";
      this.service.deleteStudents(id).subscribe(
        (respose: any) =>{
        console.log(respose);
        this.getStudents();
        },
        (error : HttpErrorResponse) => {
          // alert(error.message);
        this.getStudents();
        }
      )
      }

      public searchStudents(key: string): void {
        console.log(key);
        const results: Students[] = [];
        // Check if this.Student is defined before iterating
        if (this.Student) {
          for (const student of this.Student) {
            if (
              student.firstname.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
              student.lastname.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
              student.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
              student.course.toLowerCase().indexOf(key.toLowerCase()) !== -1
            ) {
              results.push(student);
            }
          }
        }
        this.Student = results;
        if (results.length === 0 || !key) {
          this.getStudents();
        }
      }
      

}
 