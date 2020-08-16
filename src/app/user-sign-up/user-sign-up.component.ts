import { Component, OnInit } from '@angular/core';
import { AuthenticationService  } from '../authentication.service'
import { Router ,ActivatedRoute} from '@angular/router'
import { FormBuilder,  Validators, FormArray, ReactiveFormsModule, FormGroup} from  '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.scss']
})
export class UserSignUpComponent implements OnInit {
	userForm: any;	
	imageURL: any;



  constructor( private auth: AuthenticationService,
               private router: Router,
               private formbuilder: FormBuilder) { }

  ngOnInit(): void {
  	this.userForm = this.formbuilder.group({
              first_name:'',
              last_name:'',
              email:'',
              password:'',
              id:'',
              mobile:'',
              user_file_name: ''
            })
  }

  onUserFormSubmit(userForm){

  }

  onSelectedFile(event){

  }

}
