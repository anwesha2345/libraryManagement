import { Component, OnInit } from '@angular/core';
import { AuthenticationService  } from '../../authentication.service'
import { Router ,ActivatedRoute} from '@angular/router'
import { FormBuilder,  Validators, FormArray, ReactiveFormsModule, FormGroup} from  '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss']
})
export class CustomerViewComponent implements OnInit {
  arrayListing : any;
  constructor(private auth: AuthenticationService,
               private router: Router,
               private formbuilder: FormBuilder) { }

  ngOnInit(): void {
  	this.getAllCustomerView();
  }


  getAllCustomerView(){
    this.auth.getAllCustomerDetailsData().subscribe((response: any)=>{
      this.arrayListing = response.customerDetails
    })
  }

  editCustomer(id){
    this.router.navigate(['/edit-customer-details', id]);
  }

  viewCustomer(id){
    this.router.navigate(['/view-individual-customer-details', id]);
  }

  deleteCustomer(id){
    let params = {id:id}
    console.log(params)
    this.auth.deleteCustomerDetails(params).subscribe((response: any)=>{
      if(response.code == 200){
        this.router.navigate(['/customerView']);
      } 
    })

  }

  

}
