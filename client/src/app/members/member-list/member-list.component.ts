import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
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
  userParams:UserParams | undefined;
  user:User | undefined;
  genderList = [{value:'male',display:'Males'},{value:'female',display:'Females'}];

  constructor(private memberSerive:MembersService,private accountService:AccountService){
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next:user=>{
        if(user){
          this.user = user;
          this.userParams = new UserParams(user);
        }
      }
    })
  }

  ngOnInit(): void {
    this.loadMembers();
  }
  resetFilters()
  {
    if(this.user)
    {
      this.userParams = new UserParams(this.user);
      this.loadMembers();
    }
  }
  loadMembers()
  {
    if(!this.userParams) return;
    this.memberSerive.getMembers(this.userParams).subscribe(
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
    if(this.userParams && this.userParams.pageNumber!=event.page){
      this.userParams.pageNumber = event.page;
      this.loadMembers()
    }
  }
  
}


