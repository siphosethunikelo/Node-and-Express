import { Injectable } from '@angular/core';
import { getAyoba } from '../../lib/microapp';

@Injectable({
  providedIn: 'root'
})
export class AyobaService {

  ayoba = getAyoba();

  constructor() { }

  getURLParameter(sParam) {
    const sPageURL = window.location.search.substring(1);
    const sURLVariables = sPageURL.split('&');
    for (let i = 0; i < sURLVariables.length; i++) {
      const sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] == sParam) {
        return sParameterName[1];
      }
    }
  }

  getSelfJid() {
    const selfJid = this.getURLParameter("jid")
    return selfJid
  }

  startConversation(jid: string): void {
    this.ayoba.startConversation(jid);
  }
}
