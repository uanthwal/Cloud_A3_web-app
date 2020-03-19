import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppService } from "./app.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "web-app";
  form: FormGroup;
  location;
  notesForm: FormGroup;
  searchResults = [];
  searchResultsNotes = [];
  errorMessageNote = false;
  errorMessageSearch = false;
  noteSuccess = false;
  constructor(fb: FormBuilder, private _appService: AppService) {
    this.form = fb.group({
      search_text: ["", Validators.required],
      search: ["", Validators.required]
    });
    this.notesForm = fb.group({
      notes: ["", Validators.required]
    });
  }

  onClickSubmit() {
    if (!this.form.valid) {
      this.errorMessageSearch = true;
      return;
    }
    this.notesForm.controls["notes"].setValue("");
    this.noteSuccess = false;
    this.searchResults = [];
    this.searchResultsNotes = [];
    this.errorMessageSearch = false;
    let search_for = this.form.controls["search"].value;
    this._appService
      .getDataForKeyword(search_for, {
        search_text: this.form.controls["search_text"].value
      })
      .subscribe((data: {}) => {
        if (null != data && data["code"] == 200) {
          if(search_for == "Book")
            this.searchResults = data["data"];
          else
            this.searchResultsNotes = data["data"];
        }
      });
  }

  onClickSaveNote() {
    let searchText = this.form.controls["search_text"].value;
    if (!this.notesForm.valid || searchText == "") {
      this.errorMessageNote = true;
      return;
    }
    this.errorMessageNote = false;
    let notesText = this.notesForm.controls["notes"].value;
    let payloadObj = {
      search_text: searchText,
      notes_text: notesText
    };
    this._appService.saveNoteForKeyword(payloadObj).subscribe((data: {}) => {
      if (null != data && data["code"] == 200) {
        console.log(data);
        this.noteSuccess = true;
        this.notesForm.controls["notes"].setValue("");
      }
    });
  }
}
