import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'

export interface UserDetails {
  _id: string
  first_name: string
  last_name: string
  email: string
  password: string
  exp: number
  iat: number
}

interface TokenResponse {
  token: string
}

export interface TokenPayload {
  _id: string
  first_name: string
  last_name: string
  email: string
  password: string
}

@Injectable()
export class AuthenticationService {
  token: any;
  url1 = 'http://localhost:3500/login';
  url2 = 'http://localhost:3500/register';
  url3 = 'http://localhost:3500/add-customer-details';
  url4 = 'http://localhost:3500/get-all-customer-details';
  url7 = 'http://localhost:3500/get-individual-customer-details';
  url9 = 'http://localhost:3500/update-customer-details';
  url12 = 'http://localhost:3500/customer-delete';
  url13 = 'http://localhost:3500/get-all-books';
  url14 = 'http://localhost:3500/get-all-users';
  url15 = 'http://localhost:3500/get-all-books-value';
  url16 = 'http://localhost:3500/create-book-details';
  url17= 'http://localhost:3500/create-all-book-user-details';
  loginUrl = 'http://localhost:3500/signIn';
  loginUrl1 = 'http://localhost:3500/jwt-Login-api-authentication-check';


  constructor(private http: HttpClient, private router: Router) {}
  Login(userDetails):Observable<any> 
  {
    return this.http.post(this.loginUrl,userDetails);
  }


  LoginJwt(userDetails):Observable<any> 
  {
  var  headers = new HttpHeaders().set('jwtoken', this.token);
  return this.http.get(this.loginUrl1,{headers: headers});
  }


  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      return user.exp > Date.now() / 1000
    } else {
      return false
    }
  }

  public register(user: TokenPayload): Observable<any> {
    const base = this.http.post(this.url2, user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data
      })
    )

    return request
  }

  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post(this.url1, user)
    console.log(base);
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )

    return request
  }

  public profile(): Observable<any> {
    return this.http.get(`/profile`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }
  addCustomerDetails(customer){
      return this.http.post(this.url3, customer)
  }
  getAllCustomerDetailsData(){
    return this.http.get(this.url4)
  }
  getIndividualCust(customer){
    return this.http.post(this.url7, customer)
  }
  updateCustomerDetails(customer){
    return this.http.post(this.url9, customer)
  }
  deleteCustomerDetails(customer){
    return this.http.post(this.url12, customer)
  }


  // Arpan Project
  getAllBookDetailsData(){
    return this.http.get(this.url13);
  }
  getAllUserDetailsData(){
    return this.http.get(this.url14);
  }

  getAllBook(){
    return this.http.get(this.url15);
  }

  createBookDetails(books){
    return this.http.post(this.url16, books)
  }

  createBookUserDetails(books){
    return this.http.post(this.url17, books)
  }

  getAllUsersValue(){
    return this.http.get(this.url14);
  }

}
