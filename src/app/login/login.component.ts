import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import { Router ,ActivatedRoute} from '@angular/router'
import { FormBuilder,  Validators, FormArray, ReactiveFormsModule, FormGroup} from  '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginDetails: any;
  
  

  constructor( private auth:AuthenticationService,
               private router: Router,
               private formbuilder: FormBuilder) { }

  ngOnInit(): void {
  	this.loginDetails = this.formbuilder.group({
              email:'',
              password:''  
            })
  }

  loginForm(value){
  
  }

}
