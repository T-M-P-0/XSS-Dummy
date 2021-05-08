import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forumEntry } from '../../../../Shared/entry';

@Injectable({
  providedIn: 'root'
})
export class FetchEntriesService {

  constructor(private httpClient : HttpClient) { }

public async fetchEntries() : Promise<forumEntry[]> {

  let returned : forumEntry[] = [];

  await this.httpClient.get('http://c671be603ede.ngrok.io/getentries').toPromise()
  .then((result) =>{
    returned = result as forumEntry[];

    if (returned === null){
      alert('Error retrieving');
    }
  })
  .catch(() =>{
    alert('In catch');
  });

  return returned;
}

public postEntry(entry : forumEntry) {
  return this.httpClient.post('http://c671be603ede.ngrok.io/postentry', entry).toPromise();
}

}
