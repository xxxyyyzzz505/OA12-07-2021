import { Note } from './note';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  data = [
    {
        "title": "note1",
        "content": "1111111"
    },

    {
        "title": "note2",
        "content": "22222"
    }
]

  constructor(private http: HttpClient) { }

  getNotes () {
    // return this.http.get<{title: string, content: string}[]>("../assets/data.json");
    return this.data
  }

  addNote (newNote: Note) {
    this.data.push(newNote)
    console.log(this.data);
  }

  edditNote (newNote: Note) {
    let pickedNote = this.pickNote(newNote.title);
    pickedNote.content = newNote.content;
  }

  saveNote (newNote: Note) {
    for (let note of this.data) {
      if (note.title === newNote.title) {
        this.edditNote(newNote);
      } else continue
      return
    }
    this.addNote(newNote);
  } 

  pickNote (title:string) {
    for (let note of this.data) {
      if (note.title === title) return note;
    }
  }
  deleteNote (title: string) {
    this.data.splice(this.data.indexOf(this.pickNote(title)), 1)
  }
}
