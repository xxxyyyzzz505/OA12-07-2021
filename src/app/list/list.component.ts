import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Note } from '../note';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  notes: Array<Note>
  titles: Array<string> = [];
  contents: Array<string> = [];

  newNote = new FormGroup ({
    newTitle: new FormControl (''),
    newContent: new FormControl ('')
  })

  constructor(private noteAPI: NoteService) { }

  ngOnInit(): void {
    // this.noteAPI.getNotes().subscribe(
    //   res => {
    //     Object.values(res).forEach(note => {
    //       this.titles.push(note.title);
    //       this.contents.push(note.content)
    //     })
    //   }
    // );
    this.notes = this.noteAPI.getNotes();
  }

  onSave() {
    let newTitle = this.newNote.value.newTitle;
    let newContent = this.newNote.value.newContent;
    let newNote: Note = {
      title: newTitle,
      content: newContent
    }
    this.noteAPI.addNote(newNote);
    this.newNote.reset(); 
  }

  onEdit(title) {
    let pickedNote = this.noteAPI.pickNote(title);
    console.log(pickedNote.title);
    
    this.newNote.value.newTitle = pickedNote.title;
  }
    


}
