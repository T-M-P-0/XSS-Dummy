import { Component, OnInit } from '@angular/core';
import { forumEntry } from '../../../../../Shared/entry';
import { FetchEntriesService } from'../../services/fetch-entries.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
public forumPost : string;
public author : string;
public entries : string;

  constructor(private fetchEntriesService : FetchEntriesService) { 
    this.forumPost = '';
    this.author = '';
    this.entries = '';
  }

  async ngOnInit(): Promise<void> {
    let entries : forumEntry[];

    entries = await this.fetchEntriesService.fetchEntries();
    this.entries = this.convertToHTML(entries);
  }

  public renderHTML(){
    var entriesList = document.getElementById('forumposts');

    if (entriesList != null){
      entriesList.innerHTML = '<h1 onclick="alert(5)">alert(5)</h1>';
    }
  }

  public convertToHTML(entries : forumEntry[]) : string{
    var entriesContainer = document.getElementById('forumposts');
    let htmlString = '';

    entries.forEach(entry => {
      if (entriesContainer != null){
        console.log(`test ${entry.Text}`);
                                                                                                      //calling the replacing method with the entry text to display it as text
  entriesContainer.innerHTML = entriesContainer.innerHTML.concat('<h2>' + entry.Author + '</h2><br>' + this.htmlEscapeCharacters(entry.Text));
      }
    });
   
//    alert(entriesContainer?.innerHTML);
       // htmlString = htmlString.concat('<img src="' + element.Text + '"/>');
    
    

    return htmlString;
  }

  //To replace the "unwanted" characters with html entity encoding to prevent the switching into execution context
  public htmlEscapeCharacters(input: string) : string{
    const ESC_MAP: {[index: string]: any} = {
      '&': '&amp',
      '<': '&lt',
      '>': '&gt',
      '"': '&quot',
      "'": '&#x27'};
      const reg = /[&<>"']/ig;
      return input.replace(reg, (match)=>(ESC_MAP[match]));    
  }

  public onSubmitEntry() : void{
    let newEntry = new forumEntry(this.forumPost, this.author);

    this.fetchEntriesService.postEntry(newEntry)
    .then(() =>{
      alert('Posted successfully');
    })
    .catch(() =>{
      alert('Error posting');
    });
  }
}
