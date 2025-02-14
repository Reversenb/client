import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { environment } from '../../environments/environment'
import { default_paginator, Paginator, UserQueryPagination } from '../_models/pagination'
import { User } from '../_models/user'
import { cacheManager } from '../_helper/cache'
import { parseQuery, parseUserPhoto } from '../_helper/helper'
import { firstValueFrom } from 'rxjs'


type dataCategory = 'members' | 'follower' | 'following'
@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private http = inject(HttpClient);
  private url = environment.baseUrl + 'api/' //user
  paginator = signal<Paginator<UserQueryPagination, User>>(default_paginator)

  private getData(category: dataCategory) {
    const pagination = this.paginator().pagination

    let key = cacheManager.createKey(pagination)
    const cacheData = cacheManager.load(key, category)
    if (cacheData) {
      console.log(`load ${category} from cache`)
      this.paginator.set(cacheData)
      return
    }

    console.log(`load ${category} from server`)
    const url = this.url + 'user/' + parseQuery(pagination)
    this.http.get<Paginator<UserQueryPagination, User>>(url).subscribe({
      next: (response) => {
        key = cacheManager.createKey(pagination)
        cacheManager.save(key, category, response)
        this.paginator.set(response)
      }
    })

  }
  getMember() {
    this.getData('members')
  }
  async getMemberByUsername(username: string): Promise<User | undefined> {
    const member = this.paginator().items.find(obg => obg.username === username)
    if (member) {
      console.log('get from cacghe')
      return member

    } else {
      console.log('get from api')
      try {
        const url = this.url + 'user/' + username
        const _member = await firstValueFrom(this.http.get<User>(url))
        return parseUserPhoto(_member)
      } catch (error) {
        console.log('Get Member Error: ', error)

      }
    }
    return undefined
  }
}
