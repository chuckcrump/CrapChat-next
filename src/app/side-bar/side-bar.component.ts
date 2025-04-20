import { NgFor } from "@angular/common";
import { Component, signal } from "@angular/core";
import { AfterViewInit } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
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

  constructor(
    private previewState: PreviewStateService,
    private router: Router
  ) {}

  async populateSideBar() {
    const res = await fetch("http://localhost:8080/chats/list");
    const conversations = await res.json();
    console.log(conversations.convos);
    this.chats.set(conversations.convos);
  }

  async ngAfterViewInit() {
    await this.populateSideBar();
    this.previewState.currentModel$.subscribe((model) => {
      this.model.set(model);
    });
  }

  async createChat() {
    const res = await fetch("http://localhost:8080/chats/create", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        title: "New conversation",
        messages: [],
      }),
    });
    if (res.ok) {
      const data = await res.json();
      this.router.navigate(["/chat/" + data.uuid]);
    }
  }

  async removeChat(uuid: string) {
    const res = await fetch("http://localhost:8080/chats/remove/" + uuid, {
      method: "DELETE",
    });
    if (res.ok) {
      console.log("deleted");
    }
    this.populateSideBar();
  }
}
