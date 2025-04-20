import { NgFor } from "@angular/common";
import { Component, signal } from "@angular/core";
import { AfterViewInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { PreviewStateService } from "../../preview.service";
import { ModelPickerComponent } from "../model-picker/model-picker.component";

@Component({
  selector: "app-side-bar",
  imports: [NgFor, RouterLink, ModelPickerComponent],
  templateUrl: "./side-bar.component.html",
  styleUrl: "./side-bar.component.css",
})
export class SideBarComponent {
  chats = signal<any[]>([]);
  model = signal<string>("");

  constructor(private previewState: PreviewStateService) {}

  async ngAfterViewInit() {
    const res = await fetch("http://localhost:8080/chats/list");
    const conversations = await res.json();
    console.log(conversations.convos);
    this.chats.set(conversations.convos);

    this.previewState.currentModel$.subscribe((model) => {
      this.model.set(model);
    });
  }
}
