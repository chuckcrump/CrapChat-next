import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ModelPickerComponent } from "../model-picker/model-picker.component";

@Component({
  selector: "app-home",
  imports: [RouterLink, ModelPickerComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  htmlContent: string = ``;
}
