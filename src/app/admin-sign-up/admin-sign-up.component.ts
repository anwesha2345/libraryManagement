import { Component, OnInit } from '@angular/core';
import { AuthenticationService  } from '../authentication.service'
import { Router ,ActivatedRoute} from '@angular/router'
import { FormBuilder,  Validators, FormArray, ReactiveFormsModule, FormGroup} from  '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-sign-up',
  templateUrl: './admin-sign-up.component.html',
  styleUrls: ['./admin-sign-up.component.scss']
})
export class AdminSignUpComponent implements OnInit {
  adminForm: any;
  imageURL: any;


  
  constructor(private auth: AuthenticationService,
              private router: Router,
              private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.adminForm = this.formbuilder.group({
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      id:'',
      mobile:'',
      user_file_name: ''
    })
  }

  onAdminFormSubmit(adminForm){

  }
  onSelectedFile(event){
    
  }

}
