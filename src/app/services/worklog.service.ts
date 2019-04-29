import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WorklogService {
  private baseapi = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getEmployeeWorkLogs(employeeId,startDate) {
      return this.http.get(this.baseapi 
            + "/worklog/GetWorkLog?employeeId=" +employeeId +"&&startDate=" +startDate);
  }

  saveWorklogs(empWorklogs) {
    debugger;
    return this.http.post(this.baseapi + "/worklog/SaveWorkLog", JSON.stringify(empWorklogs), {
        headers: new HttpHeaders({
            'Content-Type' : 'application/json'
        })
    });
    
}  
}




