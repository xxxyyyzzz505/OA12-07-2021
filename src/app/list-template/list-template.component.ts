import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-list-template',
  templateUrl: './list-template.component.html',
  styleUrls: ['./list-template.component.css']
})
export class ListTemplateComponent implements OnInit {
  notes: Array<Note>; 
  newTitle: string;
  newContent: string;

  constructor(private noteAPI: NoteService) { }

  ngOnInit(): void {
    this.notes = this.noteAPI.getNotes();
  }

  onSave() {
    let newNote: Note = {
      title: this.newTitle,
      content: this.newContent
    }
    this.noteAPI.saveNote(newNote);
    this.newTitle = '';
    this.newContent = '';
  }

  onPick(title) {
    let pickedNote = this.noteAPI.pickNote(title);
    console.log(pickedNote.title);
    
    this.newTitle = pickedNote.title;
    this.newContent = pickedNote.content;
  }

  onDelete(title) {
    this.noteAPI.deleteNote(title)
  }

  onRevert() {
    this.newTitle = '';
    this.newContent = '';
  }

}
