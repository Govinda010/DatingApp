import { Component } from '@angular/core';
import { Pagination } from '../_models/pagination';
import { Message } from '../_models/message';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  messages?: Message[];
  pagination?:Pagination;
  container = "Unread";
  pageNumber = 1;
  pageSize = 5;

  constructor(private messageService:MessageService){}

  ngOnInit(): void {
    this.loadMessage(); 
  }
  loadMessage()
  {
    this.messageService.getMessage(this.pageNumber,this.pageSize,this.container).subscribe({
      next:response=>{
       this.messages = response.result;
       this.pagination = response.pagination; 
      }
    })
  }

  pageChanged(event:any)
  {
    if(this.pageNumber!==event.page){
      this.pageNumber = event.page;
      this.loadMessage();
    }
  }
}
