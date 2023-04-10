import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode=false;
  users:any;

  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.geUsers();
  }

  registerToggle(){
    this.registerMode=!this.registerMode;
    console.log(this.registerMode);
  }

  geUsers(){
    this.http.get("https://localhost:5001/api/users").subscribe({
      next:response=> this.users = response,
      error:error=> console.log(error.message),
      complete:() =>console.log('Request has completed')

    });
  }
  cancelRegisterMode(event:boolean){
    this.registerMode = event;
  }
}
