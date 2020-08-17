import { Component, OnInit } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {AuthenticationService} from '../authentication.service';
import { Router ,ActivatedRoute} from '@angular/router'
import { FormBuilder,  Validators, FormArray, ReactiveFormsModule, FormGroup} from  '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'description', 'author'];
  editing = {};
  books:any = [];
  all_books:any=[];
  selectedItems: any = [];
  dropdownSettings: any = {};
  bookForm:any;
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  dataSaved = false;
  selected: any;
  items:any=[];
  rows: any = []; 
  users: any;
  all_users: any = [];
  alls: any = [];
  findUsers: any;
  
  constructor(private auth: AuthenticationService,
    private router: Router,
    private formbuilder: FormBuilder,
    private route: ActivatedRoute) { }
    

  ngOnInit(): void {

    this.getAllBookValue();
    this.getAllUserValue();
    this.bookForm = this.formbuilder.group({
      selectedItems:'',
      date:'',
      findUsers:''
    })

    this.dropdownSettings = {
      singleSelection:false,
      idField: 'id',
      textField: 'name',
      selectAllText:"Select All",
      unselectAllText: "UnSelect All",
      itemsShowLimit:3,
      allowSearchFilter: this.ShowFilter,
    }; 
  }
  onItemSelect(item) {
     
    }
    onSelectAll(items) {
      
    } 

  getAllBookValue(){
    this.auth.getAllBookDetailsData().subscribe((response: any)=>{
      this.all_books = response.books;  
    })
  }

  getAllUserValue(){
    this.auth.getAllUsersValue().subscribe((response: any)=>{
      this.all_users = response.data;
    })
  }
  onBookFormSubmit(value){
    console.log(value)
    this.auth.createBookUserDetails(value).subscribe((response: any) =>{
        this.router.navigate(['/adminDashboard'])
        
      })
  } 
 
}
