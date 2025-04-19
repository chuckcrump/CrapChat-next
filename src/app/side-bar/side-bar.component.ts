import { NgFor } from "@angular/common";
import { Component, signal } from "@angular/core";
import { AfterViewInit } from "@angular/core";

@Component({
  selector: "app-side-bar",
  imports: [NgFor],
  templateUrl: "./side-bar.component.html",
  styleUrl: "./side-bar.component.css",
})
export class SideBarComponent {
  chats = signal<any[]>([]);

  async ngAfterViewInit() {
    const res = await fetch("http://localhost:8080/chats/list");
    const conversations = await res.json();
    console.log(conversations.convos);
    this.chats.set(conversations.convos);
  }
}
