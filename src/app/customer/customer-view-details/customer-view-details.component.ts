import { Component, OnInit } from '@angular/core';
import { AuthenticationService  } from '../../authentication.service'
import { Router ,ActivatedRoute} from '@angular/router'
import { FormBuilder,  Validators, FormArray, ReactiveFormsModule, FormGroup} from  '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-view-details',
  templateUrl: './customer-view-details.component.html',
  styleUrls: ['./customer-view-details.component.scss']
})
export class CustomerViewDetailsComponent implements OnInit {
  customer_id: any;
  customerForm: any;
  imageURL: any;
  file_name: any;
  cust_deatails: any;
  age: any;
  gender: any;
  ischecked: boolean = false;
  constructor(private auth: AuthenticationService,
              private router: Router,
              private formbuilder: FormBuilder,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  	this.customer_id = this.route.snapshot.paramMap.get("id");
  	this.getIndCust(this.customer_id)
  }


  getIndCust(id){
  				var id = this.customer_id
  				var params = {id:id}
  				this.auth.getIndividualCust(params).subscribe((response: any)=>{
  					this.cust_deatails = response.details
  					if(this.cust_deatails.ageCheck == 1){
  						this.age = '>18';
  					}
  					else{
  						this.age = '<18';
  					}
  					if(this.cust_deatails.gender == 1){
  						this.gender = 'Male';
  					}
  					else{
  						this.gender = 'Female';
  					}
      			})
  				
  			}

}
