import { Component, inject, OnInit, WritableSignal } from '@angular/core'
import { environment } from '../../environments/environment'
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator'
import { MemberService } from '../_services/member.service'
import { default_pageSizeOption, default_paginator, Paginator, UserQueryPagination } from '../_models/pagination'
import { User } from '../_models/user'

import { MatExpansionModule } from '@angular/material/expansion'
import { FormsModule } from '@angular/forms'
import { MatFormField, MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { MatIconModule } from '@angular/material/icon'
import { MemberCardComponent } from './member-card/member-card.component'

@Component({
  selector: 'app-member',
  imports: [MemberCardComponent, MatIconModule, MatButtonModule, MatPaginatorModule, MatExpansionModule, FormsModule, MatInputModule, MatFormField, MatSelectModule],


  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent implements OnInit {
  private memberService = inject(MemberService)
  paginator: WritableSignal<Paginator<UserQueryPagination, User>>

  pageSize = default_pageSizeOption

  constructor() {
    this.paginator = this.memberService.paginator
  }

  ngOnInit(): void {
    this.memberService.getMember()
  }

  onPageChange(event: PageEvent) {
    const copyPaginator = this.paginator()
    copyPaginator.pagination.currentPage = event.pageIndex + 1
    copyPaginator.pagination.pageSize = event.pageSize
    this.paginator.set(copyPaginator)

    this.onSearch()

  }

  onSearch() {
    this.memberService.getMember()
  }
  onResetSearch() {
    this.paginator.set(default_paginator)
    this.onSearch()
  }
}
