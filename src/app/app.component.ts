import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})

export class AppComponent {
  title = "web-app";
  form: FormGroup;
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      search: ["", Validators.required]
    });
  }

  onClickSubmit() {
    
  }
}
