import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { TaskService } from '../services/task.service';
import { EmployeeService } from '../services/employee.service';
import { WorklogService } from '../services/worklog.service';
import {SendWorklogReq} from "./SendWorklogReq.model";

@Component({
  selector: 'app-work-log',
  templateUrl: './work-log.component.html',
  styleUrls: ['./work-log.component.scss']
})
export class WorkLogComponent implements OnInit {

  employeeId: any;
  employeeName:string;
  tasks: any;
  listemployess :any;
  worklogs:any;
  isDataAvailable:boolean = false;
  isAddShow:boolean = false;
  plusMinusClass:string='fa fa-plus-circle';
  startDate:any;
  nextStartDate:any;
  prevStartDate:any;
  sendWorklogReq: SendWorklogReq;
  weekTime: number = (60 * 60 * 24 * 7 * 1000);
  sendWorklogRequests: any = [];

  constructor(private route: ActivatedRoute,private router: Router,
              private taskService: TaskService,
              private employeeService: EmployeeService,
              private worklogService: WorklogService) { }

  ngOnInit() {
      this.route.paramMap.subscribe(params => {
      this.employeeId = parseInt(params.get("id")); 
      this.startDate =this.getStartDate();
      this.nextStartDate = new Date(this.startDate.getTime()+ this.weekTime);
      this.prevStartDate = new Date(this.startDate.getTime()- this.weekTime);
      this.sendWorklogReq= new SendWorklogReq();
    });    

    this.taskService.getallTasks().subscribe(data => {
      this.tasks = data;
      this.isDataAvailable=true;
            });
  
    this.employeeService.getallemployees().subscribe(data => {
      this.listemployess = data;
      this.isDataAvailable=true;      
            });

      this.getEmployeeWorklogs();
  }

  getStartDate(){
                     
    var today = new Date();
    var day = today.getDay();
    var startDate = new Date();
    startDate.setHours(0,0,0,0); 
    startDate.setDate(today.getDate()-day);
    return startDate;   
  }

  getEmployeeWorklogs() {
    let date = (this.startDate.getMonth() + 1) + "-" + this.startDate.getDate() + "-" + this.startDate.getFullYear();

    this.worklogService.getEmployeeWorkLogs(this.employeeId, date).subscribe((data: any) => {
        this.worklogs = data;        
    });
  }

  loadEmployeeWorklog(id, startDate) {
    this.employeeId = id || this.employeeId;
    this.startDate = startDate || this.startDate; 
    this.nextStartDate = new Date(this.startDate.getTime()+ this.weekTime);
    this.prevStartDate = new Date(this.startDate.getTime()- this.weekTime);

    this.employeeName = this.listemployess.filter(o => { return o.id == this.employeeId })[0].name;
      
    this.getEmployeeWorklogs();
    this.router.navigate(['/work-log/'+ this.employeeId]);
}

logWork(){
  this.sendWorklogRequests=[];
  if(this.isAddShow){
    this.isAddShow = false;
    this.plusMinusClass='fa fa-plus-circle';
  }
  else
  {
    this.isAddShow = true;
    this.plusMinusClass='fa fa-minus-circle';
    this.sendWorklogReq= new SendWorklogReq();
  }
  
}

addWorklog(){  
  this.sendWorklogReq.employeeId = this.employeeId;
  this.sendWorklogRequests.push(this.sendWorklogReq);
  this.sendWorklogReq= new SendWorklogReq();
}

saveWorklogs(){
  this.worklogService.saveWorklogs(this.sendWorklogRequests).subscribe(()=>{
    this.getEmployeeWorklogs();
  });
  

}
  caculateTotal(day: number){
    var total = 0;
    if(this.worklogs) {
        this.worklogs.forEach(function (value) {
          total += value[day];
            });
          } 
        return total;
        }
    
}
