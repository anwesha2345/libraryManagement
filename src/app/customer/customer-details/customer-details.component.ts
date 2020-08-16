import { Component, OnInit } from '@angular/core';
import { AuthenticationService  } from '../../authentication.service'
import { Router ,ActivatedRoute} from '@angular/router'
import { FormBuilder,  Validators, FormArray, ReactiveFormsModule, FormGroup} from  '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  
  customerForm: any;
  imageURL: any;
  file_name: any;

  constructor( private auth: AuthenticationService,
               private router: Router,
               private formbuilder: FormBuilder ) { }

  ngOnInit(): void {

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
      }

  onSelectedFile($event){
        var file = (event.target as HTMLInputElement).files[0];
        let image_name = file.name;
        this.file_name = file;
        const reader = new FileReader();
        reader.onload = () => {
          this.imageURL = reader.result as string;
        }
        reader.readAsDataURL(file)
  }

  onCustomerFormSubmit(customerForm){
        var first_name = this.customerForm.get("first_name").value;
        var avatar = this.customerForm.get("avatar").value;
        console.log(avatar)
        var last_name = this.customerForm.get("last_name").value;
        var email = this.customerForm.get("email").value;
        var mobile = this.customerForm.get("mobile").value;
        var ageCheck = this.customerForm.get("ageCheck").value;
        var gender = this.customerForm.get("gender").value;
        const formData = new FormData()
        formData.append('first_name',first_name);
        formData.append('last_name',last_name);
        formData.append('customer_file_name',this.file_name);
        formData.append('email',email);
        formData.append('mobile',mobile);
        formData.append('ageCheck',ageCheck);
        formData.append('gender',gender);
        this.auth.addCustomerDetails(formData).subscribe((response: any)=>{
          this.router.navigate(['/customerView'])
      })
      
  }

  
}
