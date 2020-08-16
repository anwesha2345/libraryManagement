import { Component, OnInit } from '@angular/core';
import { AuthenticationService  } from '../../authentication.service'
import { Router ,ActivatedRoute} from '@angular/router'
import { FormBuilder,  Validators, FormArray, ReactiveFormsModule, FormGroup} from  '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-edit-details',
  templateUrl: './customer-edit-details.component.html',
  styleUrls: ['./customer-edit-details.component.scss']
})
export class CustomerEditDetailsComponent implements OnInit {
  customer_id: any;
  customerForm: any;
  imageURL: any;
  file_name: any;
  cust_deatails: any;
  ischecked: boolean = false;


  constructor(private auth: AuthenticationService,
              private router: Router,
              private formbuilder: FormBuilder,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

		  	this.customer_id = this.route.snapshot.paramMap.get("id");
		  	this.customerForm = this.formbuilder.group({
		              first_name:'',
		              last_name:'',
		              email:'',
		              password:'',
		              gender:'',
		              ageCheck:'',
		              avatar: '',
		              id:'',
		              mobile:'',
		              customer_file_name: ''
		            })
		     this.getIndCust(this.customer_id)

  			}
  			onSelectedFile(event){
  				var file = (event.target as HTMLInputElement).files[0];
		        let image_name = file.name;
		        this.file_name = file;
		        const reader = new FileReader();
		        reader.onload = () => {
		          this.imageURL = reader.result as string;
		        }
		        reader.readAsDataURL(file)
  			}

  			getIndCust(id){
  				var id = this.customer_id
  				var params = {id:id}
  				this.auth.getIndividualCust(params).subscribe((response: any)=>{
  					console.log(response);
  					this.cust_deatails = response.details
      				this.customerForm = this.formbuilder.group({
		              first_name: this.cust_deatails.first_name,
		              last_name:this.cust_deatails.last_name,
		              email:this.cust_deatails.email,
		              mobile:this.cust_deatails.mobile,
		              gender:`${this.cust_deatails.gender}`,
		              ageCheck:`${this.cust_deatails.ageCheck}`,
		              id:this.cust_deatails._id,
		              customer_file_name:''
		            })

      			})
  				
  			}

  			onCustomerEditFormSubmit(customerForm){
			      var first_name = this.customerForm.get("first_name").value;
			      var last_name = this.customerForm.get("last_name").value;
			      var email = this.customerForm.get("email").value;
			      var mobile = this.customerForm.get("mobile").value;
			      var ageCheck = this.customerForm.get("ageCheck").value;
			      var gender = this.customerForm.get("gender").value;
			      var id = this.customerForm.get("id").value;
			      const formData = new FormData()
			      formData.append('first_name',first_name);
			      formData.append('last_name',last_name);
			      formData.append('customer_file_name',this.file_name);
			      formData.append('email',email);
			      formData.append('mobile',mobile);
			      formData.append('ageCheck',ageCheck);
			      formData.append('gender',gender);
			      formData.append('id',id);
			      this.auth.updateCustomerDetails(formData).subscribe((response: any)=>{
			        this.router.navigate(['/customerView'])
			      })
      
  			}
		}
