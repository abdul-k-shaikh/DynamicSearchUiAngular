import { Component, OnInit } from '@angular/core';
import { InsuranceService } from '../insurance.service';
import { SearchRequest } from '../search-request';
import { SearchResponse } from '../search-response';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit{
  planStatuses: any;

  constructor(private insuranceService : InsuranceService){}

  public planNames: string[] | undefined; 
 // public planStatus: any;
  public planNameField: string | undefined;
  public planStatusFiled:string | undefined;
  
  searchRequest : SearchRequest = new SearchRequest();
  searchResponse : SearchResponse[] =[];

  public selectedPlan = "select";
  public selectedStatus = "select";

  ngOnInit(): void {
    this.getPlanNames();
    this.getPlanStatus();
  }

  //this mtd will give unique plan name to diaplay in dropdown
  getPlanNames(){
    this.insuranceService.getPlanNames().subscribe((data: string[] | undefined)=>{
      this.planNames=data;
    });
  }

  getPlanStatus(){
    this.insuranceService.getPlanStatus().subscribe((data: any)=>{
      this.planStatuses=data;
    })
  }

  search(){
    this.searchRequest.planName = this.selectedPlan;
    this.searchRequest.planStatus = this.selectedStatus;
    this.insuranceService.search(this.searchRequest).subscribe(data=>{
    this.searchResponse=data;
    });
  }

  onSubmit(){
    this.search();
  }
  exportToExcel(){
    this.insuranceService.getExcel().subscribe(data=>{
       let file = new Blob([data],{type:'application/vnd.openxmlformats-officedoc'})
       var fileURL = URL.createObjectURL(file);
       window.open(fileURL); 
    });
  }

  exportToPdf(){
    this.insuranceService.getPdf().subscribe(data=>{
      let file = new Blob([data],{type:'application/pdf'});
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }
  

}
