import { Component, OnInit } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {AuthenticationService} from '../authentication.service';
import { Router ,ActivatedRoute} from '@angular/router'
import { FormBuilder,  Validators, FormArray, ReactiveFormsModule, FormGroup} from  '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'description', 'author'];
  editing = {};
  rows: any = []; 
  formGroup: any;
  dataSaved = false;
  message: any;
  TotalRow:number;
  constructor(private auth: AuthenticationService,
    private router: Router,
    private formbuilder: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  	this.findAllBoks();
  	this.formGroup = this.formbuilder.group({
      itemRows: this.formbuilder.array([this.initItemRow()])
    })
  }

  findAllBoks(){
    this.auth.getAllBook().subscribe((response: any)=>{
      var book_list = [];
      for(let i=0; i<response.bookDetails.length; i++){
        book_list.push({
        "name":response.bookDetails[i].name,
        "author":response.bookDetails[i].author,
        "description":response.bookDetails[i].description,
        "data":response.bookDetails[i].date
        })
      }
      if(book_list.length !== 0){
          
          this.rows = book_list; 
      } 
      
    })
  }


  initItemRow(){
    return this.formbuilder.group({
      name:[''],
      author:[''],
      description:[''],
    })
  }

  addMoreRow(){
    const control = <FormArray>this.formGroup.controls['itemRows'];
    control.push(this.initItemRow());
  }
  deleteRow(index:number){
    const control = <FormArray>this.formGroup.controls['itemRows'];
    if(control != null){
      this.TotalRow = control.value.length
    }
    if(this.TotalRow > 1){
      control.removeAt(index)
    } else{
      alert('One Record Is mandatory')
      return false;
    }

  }

onDynamicFormSubmit(formGroup){
    let dynamicValue = this.formGroup.value;
    this.createDynamicForm(dynamicValue);
}
createDynamicForm(dynamicForm){
  		console.log(dynamicForm)
  		this.auth.createBookDetails(dynamicForm).subscribe((response: any) =>{
        console.log(response)
        this.dataSaved = true;
        this.message = "Record Saved Successfully";
        this.formGroup.reset();
        })

        
    }

}
