import { inject, Injectable, signal } from '@angular/core'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { default_paginator, Paginator, QueryPagination } from '../_models/pagination'
import { Message } from '../_models/message'
import { WebSocketSubject } from 'rxjs/webSocket'
import { Subject } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private http = inject(HttpClient)
  private baseUrl = environment.baseUrl + 'api/message/'
  private wsUrl = environment.wsUrl
  paginator = signal<Paginator<QueryPagination, Message>>(default_paginator)
  isWSConnected = signal<boolean>(false)
  private soket$!: WebSocketSubject<any>
  private messageSubject = new Subject<Message>()
  message$ = this.messageSubject.asObservable()

  constructor() {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
    this.wsUrl = environment.production ?
      `${protocol}//${window.location.host}${environment.wsUrl}`
      : environment.wsUrl

  }

  connect(recipient_id: string, token: string, user_id: string): void {

  }

  sentMessage(message: Message): void {

  }

  close() {
    this.soket$.complete()
  }

  getMessageHistory(recipient_id: string) {

  }
}
