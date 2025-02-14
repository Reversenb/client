import { computed, inject, Injectable, Signal } from '@angular/core'
import { User } from '../_models/user'
import { AccountService } from './account.service'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  user: Signal<User | undefined>
  http: HttpClient = inject(HttpClient)
  accountService: AccountService = inject(AccountService)
  private baseApiUrl = environment.baseUrl + 'api/like/'
  constructor() {
    this.user = computed(() => this.accountService.data()?.user)
  }
  public IsFollowingMember(id: string): boolean {
    const user = this.user()
    if (!user) return false
    const following = (user.following as string[])
    return following.includes(id)
  }

  toggleLike(target_id: string): boolean {

    const user = this.user()
    if (!user) return false
    const url = this.baseApiUrl
    this.http.put(url, { target_id }).subscribe()

    const following = (user.following as string[])
    const isFollowingTarget = following.includes(target_id)
    if (isFollowingTarget) {
      console.log(`remove ${target_id} from following test`)
      user.following = following.filter(id => id !== target_id)

    } else {
      console.log(`add ${target_id} from following list`)
      following.push(target_id)
      user.following = following

    }
    this.accountService.SetUser(user)
    return user.following.includes(target_id)
  }
}