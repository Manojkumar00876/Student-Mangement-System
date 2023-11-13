import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Students } from './Students';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private serverUrl = 'http://localhost:9022';

  constructor(private http: HttpClient) { }


  // public getStudents(): Observable<Students[]> {
  //   return this.http.get<Students[]>('http://localhost:9022/students/getAll');
  // }

  public getStudents(): Observable<Students[]> {
    return this.http.get<Students[]>(`${this.serverUrl}/students/getAll`);
  }

  public saveStudents(student: Students): Observable<Students> {
    return this.http.post<Students>(`${this.serverUrl}/students/save`, student);
  }



    public updateStudents(id: any, updatedStudent: Students): Observable<Students> {
      const url = `${this.serverUrl}/students/update/${id}`;
      return this.http.put<Students>(url, updatedStudent);
    }

    public deleteStudents(Id : number): Observable<void> {
      return this.http.delete<any>(`${this.serverUrl}/students/delete/${Id}`);
    }
  

}
