import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/enviroments/environment';
import { User } from '../_models/user';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubUrl;  
  private hubConnection?:HubConnection;
  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();

  constructor(private tostr:ToastrService) { }


  createHubConnnection(user:User)
  {
    
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence',{
        accessTokenFactory:() => user.token,
        //skipNegotiation: true,
        //transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build();
      
      this.hubConnection.start().catch(error=>console.log(error));
      this.hubConnection.on("UserIsOnline",username=>{
        this.tostr.info(username + ' has connected');
      }) 
      
      this.hubConnection.on('UserIsOffline',username=>{
        this.tostr.warning(username + ' has disconnected')
      })
      this.hubConnection.on('GetOnlineUsers',usernames=>{
        this.onlineUsersSource.next(usernames);
      })
  }
  stopHubConnection()
  {
    this.hubConnection?.stop().catch(error=>console.log(error));
  }
}
