import { Component, inject, OnInit, WritableSignal } from '@angular/core'
import { LikeService } from '../_services/like.service'
import { default_pageSizeOption, default_paginator, Paginator, UserQueryPagination } from '../_models/pagination'
import { User } from '../_models/user'
import { MemberCardComponent } from '../member/member-card/member-card.component'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { FormsModule } from '@angular/forms'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormField } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { MatSelectModule } from '@angular/material/select'

@Component({
  selector: 'app-following',
  imports: [MemberCardComponent, MatIconModule, MatButtonModule, MatPaginatorModule, MatExpansionModule, FormsModule, MatInputModule, MatFormField, MatSelectModule],
  templateUrl: './following.component.html',
  styleUrl: './following.component.scss'
})
export class FollowingComponent implements OnInit {
  private likeService = inject(LikeService)
  following: WritableSignal<Paginator<UserQueryPagination, User>>
  pageSize = default_pageSizeOption
  constructor() {
    this.following = this.likeService.following
  }

  async onSearch() {
    this.likeService.getFollowing()
  }

  ngOnInit(): void {
    this.onSearch()
  }

  onResetSearch() {
    this.following.set(default_paginator)
    this.onSearch()
  }

  onPageChange(event: PageEvent) {
    const copyPaginator = this.following()
    copyPaginator.pagination.currentPage = event.pageIndex + 1
    copyPaginator.pagination.pageSize = event.pageSize
    this.following.set(copyPaginator)

    this.onSearch()

  }
}
