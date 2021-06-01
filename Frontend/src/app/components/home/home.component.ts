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

  // We have to modify the method that causes XSS
  public convertToHTML(entries : forumEntry[]) : string{
    var entriesContainer = document.getElementById('forumposts');
    let htmlString = '';

    entries.forEach(entry => {
      if (entriesContainer != null){
        entriesContainer.innerHTML = entriesContainer.innerHTML.concat('<h2>' + this.escapeCharactersForHtmlDisplay(entry.Author) + '</h2><br>' + this.escapeCharactersForHtmlDisplay(entry.Text)); // This is the problem, right here
      }                                                                                                                   // The untrusted data is added to the HTML code,  
    });                                                                                                                   // namely "entry.Author" as well as "entry.Text"
   
//    alert(entriesContainer?.innerHTML);
       // htmlString = htmlString.concat('<img src="' + element.Text + '"/>');
    
    

    return htmlString;
  }

  // We also have to create our own method to escape characters that will we injected, or concatenated in the HTML
  public escapeCharactersForHtmlDisplay(inputToEscape: string) : string{
    const ESC_MAP: {[index: string]: any} = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;'};
      const reg = /[&<>"'/]/ig;
      return inputToEscape.replace(reg, (match)=>(ESC_MAP[match]));    
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
