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
  books:any = [];
  all_books:any=[];
  selectedItems: any = [];
  dropdownSettings: any = {};
  bookForm:any;
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  
  constructor(private auth: AuthenticationService,
    private router: Router,
    private formbuilder: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllBookValue();
    this.bookForm = this.formbuilder.group({
      id:'',
      books:'',
      selectedItems:''
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
  onItemSelect(event){

  }
  onSelectAll(event){

  }

  getAllBookValue(){
    this.auth.getAllBookDetailsData().subscribe((response: any)=>{
      this.books = response;
      
      for(let i=0; i<this.books.data.length; i++){
        this.all_books.push({
          "id":this.books.data[i]._id,
          "name":this.books.data[i].name
        })
      }
      console.log(this.all_books)
    })
  }

  onFormSubmit(value){

  }
}
