import { NgFor } from "@angular/common";
import { Component, signal } from "@angular/core";
import { AfterViewInit } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-side-bar",
  imports: [NgFor, RouterLink],
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
