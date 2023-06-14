import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  // members$:Observable<Member[]>|undefined;
  pagination: Pagination | undefined;
  members: Member[] = [];
  pageNumber = 1;
  pageSize = 10;

  constructor(private memberSerive:MembersService){}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers()
  {
    this.memberSerive.getMembers(this.pageNumber, this.pageSize).subscribe(
      {
        next:response=>{
          if(response.result && response.pagination)
          {
            this.members = response.result;
            this.pagination = response.pagination;
          }
        }
      }
    )
  }

  pageChanged(event:any){
    if(this.pageNumber!=event.page){
      this.pageNumber = event.page;
      this.loadMembers()
    }
  }
  
}


